window.onload = function () {

    const name = document.getElementById('name');
    const cardnumber = document.getElementById('cardnumber');
    const expirationdate = document.getElementById('expirationdate');
    const securitycode = document.getElementById('securitycode');
    
    
    //Mask the Credit Card Number Input
    var cardnumber_mask = new IMask(cardnumber, {
        mask: "0000 0000 0000 0000",
        dispatch: function (appended, dynamicMasked) {
            var number = (dynamicMasked.value + appended).replace(/\D/g, '');
    
            for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
                let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
                if (number.match(re) != null) {
                    return dynamicMasked.compiledMasks[i];
                }
            }
        }
    });
    
    //Mask the Expiration Date
    var expirationdate_mask = new IMask(expirationdate, {
        mask: 'MM{/}YY',
        groups: {
            YY: new IMask.MaskedPattern.Group.Range([0, 99]),
            MM: new IMask.MaskedPattern.Group.Range([1, 12]),
        }
    });
    
    //Mask the security code
    var securitycode_mask = new IMask(securitycode, {
        mask: '0000',
    });
        

    
    //On Input Change Events
    
    cardnumber_mask.on('accept', function () {
        if (cardnumber_mask.value.length == 0) {
            document.getElementById('svgnumber').innerHTML = '.... .... .... ....';
        } else {
            document.getElementById('svgnumber').innerHTML = cardnumber_mask.value;
        }
    });

    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            document.getElementById('svgname').innerHTML = 'YOUR NAME HERE';
        } else {
            document.getElementById('svgname').innerHTML = this.value;
        }
    });
    
    expirationdate_mask.on('accept', function () {
        if (expirationdate_mask.value.length == 0) {
            document.getElementById('svgexpire').innerHTML = '../..';
        } else {
            document.getElementById('svgexpire').innerHTML = expirationdate_mask.value;
        }
    });
    
    securitycode_mask.on('accept', function () {
        if (securitycode_mask.value.length == 0) {
            document.getElementById('svgsecurity').innerHTML = '000';
        } else {
            document.getElementById('svgsecurity').innerHTML = securitycode_mask.value;
        }
    });
    
    };