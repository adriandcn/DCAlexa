/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const actions = require("./functions");

const Quotes = {
  Lunes: [
    
    "Vinos a mitad de precio en Hotel Quito",
    "Descuento en tu cuenta del restaurante Casa Damian."
  ],
  Martes: [
    "Duplica tus millas en tus recargas de Claro.",
    "Se viene el modo Diners en Quicentro Shopping 50 % de descuento en tus compras."
 
  ],
  
  Miercoles: [
   
    "Modo Tasty todos los miercoles 50% de descuento en restaurantes seleccionados",
    "Triplica tus millas en gasolineras Primax"
  ],
  
  Jueves: [
    
    "Recibe 3 y 6 meses sin intereses + 1 mes de gracia en mi Juguetería con tu Diners Club",
    "En el Paseo San Francisco, recibe hasta el 50% de descuento en todo el centro comercial"
  ],
  
  Viernes: [
   
    "En la gasolinera Primax, por cada 10 dólares de consumos en gasolina super, extra o ecopaís, recibes doble cupón para el sorteo de un Volkswagen Tiguán",
    "Descarga Uber Its y recibe 5 dólares de descuento en tus primeras dos órdenes"
  ]
};



// Launch Request Handler -- When a skill is launched
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    
    
    console.log("Launch Request Handler Called");
        let speechText ="";
  
   /*
    //Funcion de autorizacion por voz
    const request = handlerInput.requestEnvelope.request;
    const person = handlerInput.requestEnvelope.context.System.person;
    const personId = person.personId;
    let getAutorizedPerson = actions.getAutorizedPerson(personId);
    //

    const personalizedGreeting = "<alexa:name type=\"first\" personId=\""  
            + personId + "\"/>";
            
    console.log("el id de" + personalizedGreeting + ""+ personId);
    
    if(getAutorizedPerson[0]==="Authorized"){
        speechText ="Hola "+ personalizedGreeting +", bienvenido al asistente de voz de Diners Club. Puedes preguntarme sobre tus cuentas, tarjetas, y promociones";
    }

    else
    {*/
        speechText ="Hola, bienvenido al asistente de voz de Diners Club. Puedes preguntarme sobre tus cuentas, tarjetas, inversiones, y promociones ";
    //}
    
    let repromptText ="No he recibido ninguna instrucción.";
      
      handlerInput.attributesManager.setSessionAttributes({type:"help"});

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  }
};


// Handler for Random Promo
const RandomPromo = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "RandomPromo"
    );
  },
  handle(handlerInput) {
    console.log("RandomPromo intent handler called");

    let getPromo = actions.getPromo(Quotes);
    let day = getPromo[0];
    let promo = getPromo[1];

    let cardTitle = "Promoción del " + day;
    let cardContent = promo;
    let speechText = "La promoción del "+ day + " es: " + promo;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  }
};







// Handler for tasty Promo
const ModoTastyIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "ModoTastyIntent"
    );
  },
  handle(handlerInput) {
    console.log("RandomPromo intent handler called");

    
    let Miercoles=[];
    Miercoles[0]="Casa Damián, ubicado en Avenida Diego de Almagro y Francisco Andrade Marín esquina";
    Miercoles[1]="Restaurante La res, ubicado en Quicentro Shopping Piso 2";
    Miercoles[2]="Restaurante Zerdo, ubicado en la calle Mariano Aguilera E7 72";
    
       //first record
           let outputSpeech = 'Los restaurantes más cercanos que aplican modo Tasty a su ubicación son: '+ Miercoles[0] +', ' + Miercoles[1] +', y '+ Miercoles[2] + '';

          
    

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      //.withSimpleCard(cardTitle, cardContent)
      .getResponse();
  }
};



const PromocionDiaria = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "PromocionDiaria"
    );
  },
  handle(handlerInput) {
    console.log("PromocionDiaria Intent handler called");

    let dia = handlerInput.requestEnvelope.request.intent.slots.dia.value;

    let getPromo = actions.getPromoDiaria(Quotes, dia);

    if (!getPromo) {
      return UnhandledHandler.handle(handlerInput);
    }

     let speechText = "";
  
 
     for (let i = 0; i <  getPromo[0].length; i++) {
          
          if (i === 0) {
            //first record
            speechText = speechText + "Recuerda que por Navidad estamos en los Días Dainers. Las promociones del "+ dia + " son: " + getPromo[0][0] + ".";
            } else  {
            //last record
            speechText = speechText + ' Y ' + getPromo[0][1]; 
          } 
     }

  
    return handlerInput.responseBuilder
      .speak(speechText)
      //.withSimpleCard(cardTitle, cardContent)
      .getResponse();
      
     


  }
};



const GetTarjetaEspecificaHandler = {
    
    
    canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TarjetaEspecifica');
  },

  
   async handle(handlerInput) {
      
    let outputSpeech = '';
    let repromptText="";
  
    let tarjeta = handlerInput.requestEnvelope.request.intent.slots.tarjeta.value;
    let getTarjeta = actions.getTarjeta(tarjeta);
    
    if (!getTarjeta) {
      return UnhandledHandler.handle(handlerInput);
    }

    tarjeta = getTarjeta[0];
      switch (tarjeta) {
      case "Visa":
       tarjeta = "Visa Titanium";
        break;
        case "Diners":
        tarjeta = "Diners Club";
        
    
      default:
        tarjeta: "Unknown";
    }

   await getRemoteData('https://kvillacreses-eval-prod.apigee.net/tarjetas/credit_cards/statement?customer_id=1&brand='+tarjeta)
   
      .then((response) => {
        const data = JSON.parse(response);
           outputSpeech = 'La fecha de corte de su tarjeta '+ tarjeta +' es: ' + data.response.message.next_court_day + '. y el valor a pagar es: '+ data.response.message.total_to_payment +' dólares. ' ;
    
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });
           
           
             // Setting the attributes property for data persistence within the session
    let attributes = {
      type: "tarjeta"
    };
    handlerInput.attributesManager.setSessionAttributes(attributes);

   repromptText="Deseas diferir el saldo pendiente?";
   return handlerInput.responseBuilder
      .speak(outputSpeech)
      .reprompt(repromptText)
      .getResponse();

  },
  
  
  
};






const InversionesIntentHandler = {
    
    
    canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'InversionesIntent');
  },

  
   handle(handlerInput) {
      
   
    let repromptText="";
  
    let aeropuerto = handlerInput.requestEnvelope.request.intent.slots.aeropuerto.value;
 
 let outputSpeech = 'En breve un acesor se contactará contigo para darte los detalles correspondientes';
           
             // Setting the attributes property for data persistence within the session
    let attributes = {
      type: "inversiones"
    };
    handlerInput.attributesManager.setSessionAttributes(attributes);

   repromptText="Es correcto inversiones";
   return handlerInput.responseBuilder
      .speak(outputSpeech)
      //.reprompt(repromptText)
      .getResponse();

  },
  
  
  
};


const SalaVipIntentHAndler = {
    
    
    canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SalaVipIntent');
  },

  
   handle(handlerInput) {
      
   
    let repromptText="";
  
    let aeropuerto = handlerInput.requestEnvelope.request.intent.slots.aeropuerto.value;
 
 let outputSpeech = 'Su reserva a la SALA VIP '+ aeropuerto + 'en el aeropuerto Mariscal Sucre ha sido confirmada, se enviarán los detalles a su correo electrónico';
           
             // Setting the attributes property for data persistence within the session
    let attributes = {
      type: "salaVIP"
    };
    handlerInput.attributesManager.setSessionAttributes(attributes);

   repromptText="SalaVIP";
   return handlerInput.responseBuilder
      .speak(outputSpeech)
      //.reprompt(repromptText)
      .getResponse();

  },
  
  
  
};





// If the user said "Yes" to anything
const YesIntent = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.YesIntent"
      );
  },
  handle(handlerInput) {
    console.log("AMAZON.YesIntent intent handler called");
    
    let attributes = handlerInput.attributesManager.getSessionAttributes();
    console.log(attributes.type);
    let speechText = "";
    
    if (attributes.type) {
      switch (attributes.type) {
        case "tarjeta":
         speechText = "Me contactaré con nuestro Chatbot Diners Andrea para que se comunique contigo y poder atender tu solicitud";
        case "salaVIP":
         speechText = "Gracias por usar Diners CLub";
          
        default:
         speechText = "Me contactaré con nuestro Chatbot Diners Andrea para que se comunique contigo y poder atender tu solicitud";
      }
      
    } else {
      speechText = "En breve un acesor se contactará contigo para darte los detalles correspondientes";
    }
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};


const GetMovimientosHandler = {
    
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MovimientosIntend');
  },
  
  
   async handle(handlerInput) {
      
    let outputSpeech = '';
  
    let tarjeta = handlerInput.requestEnvelope.request.intent.slots.tarjeta.value;

    let getTarjeta = actions.getTarjeta(tarjeta);
    
    if (!getTarjeta) {
      return UnhandledHandler.handle(handlerInput);
    }

    tarjeta = getTarjeta[0];
      switch (tarjeta) {
        case "Visa":
         tarjeta = "Visa Titanium";
        break;
        case "Diners":
         tarjeta = "Diners Club";
        break;
    
      default:
        tarjeta: "Unknown";
    }

   await getRemoteData('https://kvillacreses-eval-prod.apigee.net/tarjetas/credit_cards/statement?customer_id=1&brand='+tarjeta)
   
      .then((response) => {
        const data = JSON.parse(response);
    
         outputSpeech = `al momento tiene ${data.response.message.movements.length} movimientos correspondientes a su último corte, se listarán los últimos movimientos. `;
         
        let dates=[];
        for (let i = 0; i < data.response.message.movements.length; i++) {
             let fechaA=data.response.message.movements[i].date;
             let fechaB=fechaA.split(",");
         dates[i] = {id:i,date:fechaB[0]+" "+fechaB[1]};
        
        }
        
        console.log(dates);

            //Movimeintos ordenados por fecha
            dates.sort(function(a, b) {
                var dateA = new Date(a.date), dateB = new Date(b.date);
                return dateA > dateB ? -1 : 1;  
            });

        for (let i = 0; i < 3; i++) {
            let fechaA=data.response.message.movements[dates[i].id].date;
            let fechaB=fechaA.split(",");
            fechaB = fechaB[0].split("/");
            fechaB = (fechaB[1]+"/"+ fechaB[0]+"/" +fechaB[2]); 
 
            let tipo=data.response.message.movements[[dates[i].id]].type;
              switch (tipo) {
                  case "CREDIT":
                    tipo = "crédito";
                  break;
                  case "DEBIT":
                    tipo = "débito";
                  break;
                default:
                tipo: "Unknown";
              }
            
          if (i === 0) {
            //first record
            outputSpeech = outputSpeech + 'El : <say-as interpret-as="date">' + fechaB + '</say-as> tiene un '+ tipo +' de : '+ data.response.message.movements[[dates[i].id]].amount +' dólares, correspondientes a '+ data.response.message.movements[[dates[i].id]].description +', '
          } else if (i === 2) {
            //last record
            outputSpeech = outputSpeech + ' y el <say-as interpret-as="date">' + fechaB + '</say-as> que tiene un '+ tipo +' de: '+ data.response.message.movements[[dates[i].id]].amount +' dólares, correspondientes a '+ data.response.message.movements[[dates[i].id]].description +', '
          } else {
            //middle record(s)
            outputSpeech = outputSpeech + 'el : ' + fechaB + ' tiene un '+ tipo +' de : '+ data.response.message.movements[[dates[i].id]].amount +' dólares , correspondientes a '+ data.response.message.movements[[dates[i].id]].description +', '
          }
        }
        
        
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });
           
      
   return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
  
  
  
};

const GetRemoteDataHandler = {
    
    
    
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetRemoteDataIntent');
  },
  
  
  async handle(handlerInput) {
      
      let outputSpeech = '';
    
    await getRemoteData('http://kvillacreses-eval-prod.apigee.net/tarjetas/credit_cards?customer_id='+1)
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `al momento tiene ${data.response.message.length} tarjetas de crédito disponibles. `;
        for (let i = 0; i < data.response.message.length; i++) {
          if (i === 0) {
            //first record
            outputSpeech = outputSpeech + 'Su tarjeta: ' + data.response.message[i].brand + ' tiene un cupo de: '+ data.response.message[i].available_quota +' dólares, '
          } else if (i === data.response.message.length - 1) {
            //last record
            outputSpeech = outputSpeech + ' y ' + data.response.message[i].brand + 'que tiene un cupo de: '+ data.response.message[i].available_quota +' dólares.'
          } else {
            //middle record(s)
            outputSpeech = outputSpeech + data.response.message[i].number + ', '
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });
           
            
             let repromptText ="Necesitas algo más?";

   return handlerInput.responseBuilder
      .speak(outputSpeech)
    //  .reprompt(repromptText)
      .getResponse();
  },
};



// When the user says "No" to a request
const NoIntent = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.NoIntent"
      );
  },
  handle(handlerInput) {
    const speechText = 'Gracias por usar Diners Club. Socios para toda la vida!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can introduce yourself by telling me your name';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Gracias por usar Diners Club socios para toda la vida!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Por favor, repite tu instrucción!.')
      .reprompt('Por favor, repite tu instrucción!.')
      .getResponse();
  },
};

// Unhandled Requests
const UnhandledHandler = {
  canHandle() {
      return true;
  },
  handle(handlerInput, error) {
      console.log(`Error Handler : ${error.message}`);
      
      return handlerInput.responseBuilder
        .speak('Lo siento, no he entendido tu instucción para ayuda solo repite, Alexa pregunta a Diners Club, y di lo que necesites')
        .getResponse();
  }
};


const getRemoteData = function (url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
  })
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetRemoteDataHandler,
    GetMovimientosHandler,
    InversionesIntentHandler,
    YesIntent,
    SalaVipIntentHAndler,
    ModoTastyIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    GetTarjetaEspecificaHandler,
    LaunchRequestHandler,
    SessionEndedRequestHandler,
    NoIntent,
    PromocionDiaria,
    RandomPromo,
    UnhandledHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

