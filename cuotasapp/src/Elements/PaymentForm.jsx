import React from 'react'
import { useEffect } from 'react'
import swal from 'sweetalert';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export const PaymentForm = (props) => {
    const history = useHistory();
    const id = props.location.pathname.split("/")[2];

    useEffect(() => {
        window.Mercadopago.setPublishableKey("TEST-bc17f6a0-f7b6-44e0-9e73-8bfd9973b243");
        window.Mercadopago.getIdentificationTypes();
    })

    const guessPaymentMethod = () => {
        let cardnumber = document.getElementById("cardNumber").value;

        if (cardnumber.length >= 6) {
            let bin = cardnumber.substring(0,6);
            window.Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethod);
        }
    }

    const setPaymentMethod = (status, response) => {
        if (status === 200) {
            let paymentMethodId = response[0].id;
            let element = document.getElementById('payment_method_id');
            element.value = paymentMethodId;
            getInstallments();
        } else {
            document.getElementById("cardNumber").value = "";
            swal("Número de tarjeta incorrecto!", "", "error")
        }
    }

    const getInstallments = () => {
        window.Mercadopago.getInstallments({
            "payment_method_id": document.getElementById('payment_method_id').value,
            "amount": parseFloat(document.getElementById('transaction_amount').value)
            
        }, function (status, response) {
            if (status === 200) {
                document.getElementById('installments').options.length = 0;
                response[0].payer_costs.forEach( installment => {
                    let opt = document.createElement('option');
                    opt.text = installment.recommended_message;
                    opt.value = installment.installments;
                    document.getElementById('installments').appendChild(opt);
                });
            } else {
                alert(`installments method info error: ${response}`);
            }
        });
    }

    const doPay = () => {
        var data = {
            cardNumber: document.getElementById("cardNumber").value,
            securityCode: document.getElementById("securityCode").value,
            cardExpirationMonth: document.getElementById("cardExpirationMonth").value,
            cardExpirationYear: document.getElementById("cardExpirationYear").value,
            cardholderName: document.getElementById("cardholderName").value,
            docType: document.getElementById("docType").value,
            docNumber: document.getElementById("docNumber").value,
            installments: document.getElementById("installments").value
        }
        
        window.Mercadopago.createToken(data, sdkResponseHandler);

        return false;
    }

    const sdkResponseHandler = (status, response) => {
        if (status !== 200 && status !== 201) {
            swal("Revise la información!", "", "error")
        }else{
            var data = {
                transaction_amount: document.getElementById("transaction_amount").value,
                token: response.id,
                description: document.getElementById("description").value,
                installments: document.getElementById("installments").value,
                payment_method_id: document.getElementById("payment_method_id").value,
                email: document.getElementById("email").value
            }

            Axios.post("http://localhost:5001/procesar_pago/"+id, data)
                .then(res => {
                    console.log(res);
                    swal("Pago procesado!", "", "success")
                        .then(() => {history.push("/customer/"+id)})
                })
                .catch(err => swal("El pago no ha podido ser procesado", "", "error"));
        }
    }

    return (
        <>
            <div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Descripción</label>                  
                    <div className="col-sm-10">
                        <input type="text" name="description" id="description" defaultValue="Ítem seleccionado" className="form-control w-75 p-3" />
                    </div>
                </div>                    
                <div className="form-group row">
                    <label htmlFor="transaction_amount" className="col-sm-2 col-form-label">Monto a pagar</label>     
                    <div className="col-sm-10">                   
                        <input name="transaction_amount" id="transaction_amount" defaultValue="100" className="form-control w-75 p-3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="cardNumber" className="col-sm-2 col-form-label">Número de la tarjeta</label>
                    <div className="col-sm-10">
                        <input onChange={guessPaymentMethod} type="text" id="cardNumber" data-checkout="cardNumber" autoComplete="off" className="form-control w-75 p-3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="cardholderName" className="col-sm-2 col-form-label">Nombre y apellido</label>
                    <div className="col-sm-10">
                        <input type="text" id="cardholderName" data-checkout="cardholderName" className="form-control w-75 p-3" />
                    </div>
                </div>                                    
                <div className="form-group row">
                    <label htmlFor="cardExpirationMonth" className="col-sm-2 col-form-label">Mes de vencimiento</label>
                    <div className="col-sm-10">
                        <input type="text" id="cardExpirationMonth" data-checkout="cardExpirationMonth" autoComplete="off" className="form-control w-75 p-3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="cardExpirationYear" className="col-sm-2 col-form-label">Año de vencimiento</label>
                    <div className="col-sm-10">
                        <input type="text" id="cardExpirationYear" data-checkout="cardExpirationYear" autoComplete="off" className="form-control w-75 p-3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="securityCode" className="col-sm-2 col-form-label">Código de seguridad</label>
                    <div className="col-sm-10">
                        <input type="text" id="securityCode" data-checkout="securityCode" autoComplete="off" className="form-control w-75 p-3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="installments" className="col-sm-2 col-form-label">Cuotas</label>
                    <div className="col-sm-10">
                        <select id="installments" name="installments" className="form-control w-75"></select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="docType" className="col-sm-2 col-form-label">Tipo de documento</label>
                    <div className="col-sm-10">
                        <select id="docType" data-checkout="docType" className="form-control w-75"></select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="docNumber" className="col-sm-2 col-form-label">Número de documento</label>
                    <div className="col-sm-10">
                        <input type="text" id="docNumber" data-checkout="docNumber" className="form-control w-75 p-3" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">E-mail</label>
                    <div className="col-sm-10">
                        <input type="email" id="email" name="email" defaultValue="test@test.com" className="form-control w-75 p-3" />
                    </div>
                </div>  
                
                <input type="hidden" name="payment_method_id" id="payment_method_id"/>
                    
                    <Button variant="contained" color="primary" onClick={doPay}>Pagar</Button>
            </div>
        </>
    )
}