import React from 'react'
import { useEffect } from 'react'
import swal from 'sweetalert';

export const PaymentForm = (props) => {
    var doSubmit = false;
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

    const doPay = (event) => {
        event.preventDefault();
        if(!doSubmit){
            var $form = document.querySelector('#pay');
    
            window.Mercadopago.createToken($form, sdkResponseHandler);
    
            return false;
        }
    }

    const sdkResponseHandler = (status, response) => {
        if (status !== 200 && status !== 201) {
            swal("Revise la información!", "", "error")
        }else{
            var form = document.querySelector('#pay');
            var card = document.createElement('input');
            card.setAttribute('name', 'token');
            card.setAttribute('type', 'hidden');
            card.setAttribute('value', response.id);
            form.appendChild(card);
            doSubmit = true;
            form.submit();
        }
    }

    return (
        <>
            <div>
                <form action={"http://localhost:5001/procesar_pago/"+id} className="pt-5" method="post" id="pay" name="pay" onSubmit={doPay} >
                    <div className="form-group row">
                        <label for="description" className="col-sm-2 col-form-label">Descripción</label>                  
                        <div class="col-sm-10">
                            <input type="text" name="description" id="description" defaultValue="Ítem seleccionado" className="form-control w-75 p-3" />
                        </div>
                    </div>                    
                    <div className="form-group row">
                        <label for="transaction_amount" className="col-sm-2 col-form-label">Monto a pagar</label>     
                        <div class="col-sm-10">                   
                            <input name="transaction_amount" id="transaction_amount" defaultValue="100" className="form-control w-75 p-3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="cardNumber" className="col-sm-2 col-form-label">Número de la tarjeta</label>
                        <div class="col-sm-10">
                            <input onChange={guessPaymentMethod} type="text" id="cardNumber" data-checkout="cardNumber" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" className="form-control w-75 p-3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="cardholderName" className="col-sm-2 col-form-label">Nombre y apellido</label>
                        <div class="col-sm-10">
                            <input type="text" id="cardholderName" data-checkout="cardholderName" className="form-control w-75 p-3" />
                        </div>
                    </div>                                    
                    <div className="form-group row">
                        <label for="cardExpirationMonth" className="col-sm-2 col-form-label">Mes de vencimiento</label>
                        <div class="col-sm-10">
                            <input type="text" id="cardExpirationMonth" data-checkout="cardExpirationMonth" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" className="form-control w-75 p-3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="cardExpirationYear" className="col-sm-2 col-form-label">Año de vencimiento</label>
                        <div class="col-sm-10">
                            <input type="text" id="cardExpirationYear" data-checkout="cardExpirationYear" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" className="form-control w-75 p-3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="securityCode" className="col-sm-2 col-form-label">Código de seguridad</label>
                        <div class="col-sm-10">
                            <input type="text" id="securityCode" data-checkout="securityCode" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" className="form-control w-75 p-3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="installments" className="col-sm-2 col-form-label">Cuotas</label>
                        <div class="col-sm-10">
                            <select id="installments" name="installments" className="form-control w-75"></select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="docType" className="col-sm-2 col-form-label">Tipo de documento</label>
                        <div class="col-sm-10">
                            <select id="docType" data-checkout="docType" className="form-control w-75"></select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="docNumber" className="col-sm-2 col-form-label">Número de documento</label>
                        <div class="col-sm-10">
                            <input type="text" id="docNumber" data-checkout="docNumber" className="form-control w-75 p-3" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="email" className="col-sm-2 col-form-label">E-mail</label>
                        <div class="col-sm-10">
                            <input type="email" id="email" name="email" defaultValue="test@test.com" className="form-control w-75 p-3" />
                        </div>
                    </div>  
                    
                    <input type="hidden" name="payment_method_id" id="payment_method_id"/>
                    
                    <input type="submit" value="Pagar" className="btn btn-primary" />
                </form>
            </div>
        </>
    )
}