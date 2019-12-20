const https=require("https");


const myfunctions = {
  
  getPromo: function(quotes, dia) {
    console.log("Getting into getPromoFunction");

    // Get random promo if dia is not defined
    if (dia === undefined) {
      var totalauthors = Object.keys(quotes).length;
      var rand = Math.floor(Math.random() * totalauthors);

      // random day
      dia = Object.keys(quotes)[rand];
    }

    // check the day if it exists, and have a single day name
    switch (dia) {
      case "Lunes":
        dia = "Lunes";
        break;
        case "lunes":
        dia = "Lunes";
        break;
      case "Martes":
        dia = "Martes";
        break;
        case "martes":
        dia = "Martes";
        break;
      case "Miércoles":
        dia = "Miércoles";
        break;
      case "miercoles":
        dia = "Miércoles";
        break;
      case "miércoles":
        dia = "Miércoles";
        break;
      
      case "jueves":
        dia = "Jueves";
        break; 
      case "Jueves":
        dia = "Jueves";
        break;
        
      case "viernes":
        dia = "Viernes";
        break;        
      case "Viernes":
        dia = "Viernes";
        break;
      default:
        dia: "Unknown";
    }

    // Get total quotations for the author from the Quotes object
    var totalquotations = quotes[dia].length;

    // Select a random quotation
    var randquote = Math.floor(Math.random() * totalquotations);
    var quote = quotes[dia][randquote];

    console.log("Return dia y promo");

    // return both the author name and the quote as an array
    return [dia, quote];
  },
  
    getPromoDiaria: function(quotes, dia) {
    console.log("Getting into getPromoFunction");

    // Get random promo if dia is not defined
    if (dia === undefined) {
      var totalauthors = Object.keys(quotes).length;
      var rand = Math.floor(Math.random() * totalauthors);

      // random day
      dia = Object.keys(quotes)[rand];
    }

    // check the day if it exists, and have a single day name
    switch (dia) {
      case "Lunes":
        dia = "Lunes";
        break;
        case "lunes":
        dia = "Lunes";
        break;
      case "Martes":
        dia = "Martes";
        break;
        case "martes":
        dia = "Martes";
        break;
      case "Miércoles":
        dia = "Miércoles";
        break;
      case "miercoles":
        dia = "Miércoles";
        break;
      case "miércoles":
        dia = "Miércoles";
        break;
      
      case "jueves":
        dia = "Jueves";
        break; 
      case "Jueves":
        dia = "Jueves";
        break;
        
      case "viernes":
        dia = "Viernes";
        break;        
      case "Viernes":
        dia = "Viernes";
        break;
      default:
        dia: "Unknown";
    }

    // Get total quotations for the author from the Quotes object
    var totalquotations = quotes[dia].length;

  
    var promos = quotes[dia];

    console.log("Return dia y promo");

    // return both the author name and the quote as an array
    return [promos];
  },
  
  //Map de las ariantes de tarjeta de crédito Visa y Diners
  getTarjeta: function(tarjeta) {
    console.log("Getting into getarjetaFunction");

  

    // check the day if it exists, and have a single day name
    switch (tarjeta) {
      case "Visa":
        tarjeta = "Visa";
        break;
        case "Visa Titanium":
        tarjeta = "Visa";
        break;
      case "visa":
        tarjeta = "Visa";
        break;
        case "visa titanium":
        tarjeta = "Visa";
        break;
      case "Diners":
        tarjeta = "Diners";
        break;
        case "diners":
        tarjeta = "Diners";
        break;
      case "Diners Club":
        tarjeta = "Diners";
        break;
      case "diners club":
        tarjeta = "Diners";
        break;
      
      
      default:
        tarjeta: "Unknown";
    }



    console.log("Return tarjeta: "+ tarjeta);

  
    return [tarjeta];
  },
  
  
    //Permisos de voz
  getAutorizedPerson: function(id_person) {
    console.log("Getting into getAutorized person");
             //adrian 3: "amzn1.ask.person.AETFDREMZSDFA6A2BGJQKVQ7S6VVV25PIGECY44EGVLWMK5YNV6723RCAHY2EW72IQYUNNJFRMIAFG7UHSJ7LTDVZS3IHGRRW2TNY66U"
             //cris: 4: "amzn1.ask.person.AETFDREMZSDFA6A2BGJQKVQ7S6VVV25PIGECY44EGVLWMK5YNV672WJHW2BSF5XZQM7GC65C3QHQP37DDCJECABMJFZH7AERN72RGKRR"
             //xavi: 2:  amzn1.ask.person.AETFDREMZSDFA6A2BGJQKVQ7S6VVV25PIGECY44EGVLWMK5YNV6736ALK5ZEM4UE4MUW25LB6MI6776WH5R6H7W5FMR2ERMMJI55OYJS
             //karla 1:
  switch (id_person) {
      case "amzn1.ask.person.AETFDREMZSDFA6A2BGJQKVQ7S6VVV25PIGECY44EGVLWMK5YNV6723RCAHY2EW72IQYUNNJFRMIAFG7UHSJ7LTDVZS3IHGRRW2TNY66U":
       id_person = "Authorized";
        break;
        case "amzn1.ask.person.AETFDREMZSDFA6A2BGJQKVQ7S6VVV25PIGECY44EGVLWMK5YNV672WJHW2BSF5XZQM7GC65C3QHQP37DDCJECABMJFZH7AERN72RGKRR":
        id_person = "No Authorized";
        break;
         case "amzn1.ask.person.AETFDREMZSDFA6A2BGJQKVQ7S6VVV25PIGECY44EGVLWMK5YNV6736ALK5ZEM4UE4MUW25LB6MI6776WH5R6H7W5FMR2ERMMJI55OYJS":
        id_person = "No Authorized";
        break;
    
      default:
        id_person: "No Authorized";
    }


    console.log("Persona: "+ id_person);

    // return both the author name and the quote as an array
    return [id_person];
  },
  
   // Make an HTTP Request and retrieve data either through GET or POST
  getData: function(options, postData) {
    return new Promise(function(resolve,reject) {
      var request = https.request(options, function(response) {
        // reject if status is not 2xxx
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return reject(new Error("statusCode=" + response.statusCode));
        }
        
        // Status is in 2xx
        // cumulate data
        var body = [];
        response.on("data", function (chunk) {
          body.push(chunk);
        });
        
        // when process ends
        response.on("end", function() {
          try {
            body = JSON.parse(Buffer.concat(body).toString());
            // use just 'body' for non JSON input
          } catch (error) {
            reject(error);
          }
          resolve(body);
        });
      });

      // manage other request errors
      request.on("error", function(error) {
        reject(error);
      });

      // POST data (optional)
      if (postData) {
        request.write(postData);
      }
      
      // End the request. It's Important
      request.end();
    }); // promise ends
  }
};

module.exports = myfunctions;
