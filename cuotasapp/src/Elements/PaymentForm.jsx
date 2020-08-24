import React from 'react'

export const PaymentForm = () => {
    return (
        <form action="http://localhost:5001/procesar_pago" className="pt-5" method="post" id="pay" name="pay" >
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
                    <input type="text" id="cardNumber" data-checkout="cardNumber" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" className="form-control w-75 p-3" />
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
    )
}