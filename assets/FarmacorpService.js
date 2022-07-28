


console.log('79716b858c8c1a4fc9acdd3af6acdeb3c7cfc979');
console.log('be70df962967ae1c995f91f5758845c5b348c660');
console.log('https://apicloud.farmacorp.com/apishopify');
function cHeaders(){
  return 	{
    'Authorization':`Basic ${btoa(`79716b858c8c1a4fc9acdd3af6acdeb3c7cfc979:be70df962967ae1c995f91f5758845c5b348c660`)}`,
           'Content-Type':'application/json'
        };
}

function uHeaders(){  
 if(!localStorage.as)
    window.location.href = '/account/logout';
  return 	{
    'Authorization':`Bearer ${ JSON.parse(atob(JSON.parse(localStorage.as).gbl)).access_token}`,
    'Content-Type':'application/json'
  };
}

$(document).ready(function(){	
  pingService();
});

function pingService(){

  /*
  getAvailabilityStockRegion('0','0','city')
  .then(function(data) { 
      //verifyAvailability(data.data, city);
  }).catch(function(err) {
      console.log(err);
  }); 
  */
  
  /*
  getTokenApi()
  .then(function(data) { 
    localStorage["at"] = JSON.stringify({ gbl : btoa(JSON.stringify(data)) });
  }).catch(function(err) {
      console.log(err);
  });  
  */
  
}

function getTokenApi(){    
   return new Promise(function(resolve, reject) {
     
     var token = `79716b858c8c1a4fc9acdd3af6acdeb3c7cfc979:be70df962967ae1c995f91f5758845c5b348c660`;
     var hash = btoa(token); 
     $.ajax({
          url: 'https://apicloud.farmacorp.com/apishopify/api/identity/v1/token',
          type:'post',
         async: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization':'Basic '+ hash,
          },
          data: {
                 'grant_type' : 'client_credentials'
          } ,
          contentType: 'application/x-www-form-urlencoded',
          success: function(data) {
           if(data.data)
                {
                    resolve(data) 
                }else
                {
                   if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
                }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function getAvailabilityStockSucursal(codigo, filtro){    
  

  var paramObject = {
    handleId : codigo
  };
  var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v2.0/mobile/catalog/product/availability/sucursal`,
          type:'post',
         async: false,
          headers: cHeaders(),
          data: sData ,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
             
           if(data)
                {
                    resolve(data) 
                }else
                {
                  if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
                }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function getAvailabilityStockRegion(productoId, varianteId, ciudad){  
  
  
  var paramObject = {
    idProducto : productoId,
    idVariant : varianteId,
    ciudad : ciudad
  };
  var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/mobile/catalog/product/regional/availabity`,
          type:'post',
         async: false,
          headers: cHeaders(),
     data: sData,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
           if(data.data>=0)
                {
                    resolve(data) 
                }else
                {
                   if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
                }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}
  
function getCiudades(){    
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/ezeus/api/v1.0/location/setting/ciudades`,
          type:'get',
         async: false,
          headers: cHeaders(),
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
           if(data.data)
                {
                    resolve(data) 
                }else
                {
                  if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
                }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function getServicios(){  
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/location/setting/services`,
          type:'get',
         async: false,
          headers: cHeaders(),
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
           if(data.data)
                {
                    resolve(data) 
                }else
                {
                  if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
                }
        },
        error: function(err) {
            setTimeout(location.reload(), 2000);
          reject(err)
       }
    });
  });
}

function getSucursales(keyRegion){   

   return new Promise(function(resolve, reject) {
     $.ajax({
       url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/location/web/${keyRegion}`,
          type:'get',
         async: false,
          headers: cHeaders(),
          contentType: 'application/json;charset=utf-8',
          success: function(response) {
           //if(data.data)
               //{
                    resolve(response) 
               // }else
               // {
               //    if((data.errors) && (data.errors.length>0))
               //   	alert(data.errors[0].message);
               // }
        },
        error: function(err) {
          reject(err);
       }
    });
  }); 
}

function getTokenUsuario(username, password){    

   return new Promise(function(resolve, reject) {       
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/identity/v1/web/token`,
          type:'post',
         async: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: {
            'username' : username,
            'password' : password,
            'grant_type' : 'password'
          },
          contentType: 'application/x-www-form-urlencoded',
          success: function(data) {
              
              if(data.access_token)
                {
                   localStorage["as"] = JSON.stringify({ gbl :btoa(JSON.stringify(data)) });
            
                    var now = new Date();
                    now.setSeconds(now.getSeconds() + data.expires_in);
                    now = new Date(now); 

                    localStorage["next"] = now;
                    resolve(data) 
                }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function refreshTokenUsuario(refresh_token){    
   return new Promise(function(resolve, reject) {       
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/ezeus/api/identity/v1/web/token`,
          type:'post',
         async: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: {
            'refresh_token' : refresh_token,
            'grant_type' : 'refresh_token'
          },
          contentType: 'application/x-www-form-urlencoded',
          success: function(data) {
             if(data.access_token)
                {
                   localStorage["as"] = JSON.stringify({ gbl :btoa(JSON.stringify(data)) });
            
                    var now = new Date();
                    now.setSeconds(now.getSeconds() + data.expires_in);
                    now = new Date(now); 

                    localStorage["next"] = now;
                    resolve(data) 
                }
            },
            error: function(err) {
                reject(err)
            }
    });
  });
}

function changePassword(oldPassword, password, confirmPassword){    
  
  var paramObject = {
    oldPassword : oldPassword,
    password : password,
    confirmPassword : confirmPassword
  };
  var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/account/changepassword`,
          type:'post',
         async: false,
          headers: uHeaders(),
          data: sData ,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
          if(data.data)
            {
               resolve(data.data) 
            }else
            {
               if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
            }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function getPointsFarmaclub(idFarmacorp, idCliente, idGrupo){    
  
    var paramObject = {
      idFarmacorp: idFarmacorp,
      idCliente: idCliente,
      idGrupo: idGrupo
   };
  
   var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/account/summary/points`,
          type:'post',
          async: false,
          headers: uHeaders(),
          data: sData ,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
                        
            if(data.data)
            {
               resolve(data.data) 
            }else
            {
               if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
            }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function updateCustomer(nombres, apellidos, celular){    
   var paramObject = {
      first_name : nombres,
      last_name : apellidos,
      phone : celular
   };
  
   var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
        url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/account/update`,
        type:'post',
        async: false,
        headers: uHeaders(),
        data: sData ,
        contentType: 'application/json; charset=utf-8',
        success: function(data) {          
          if(data.data)
          {
            resolve({ ok : true}) 
          }else {
            if((data.errors) && (data.errors.length>0))
                alert(data.errors[0].message);
          }          
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function direccionEliminar(idClienteShopify, idAddress, isDefault) {    
   var paramObject = {
    id: idAddress,
    customerId: idClienteShopify,
    default: isDefault
   };
  
   var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
       url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/customer/address/delete`,
          type:'post',
          async: false,
          headers: uHeaders(),
          data: sData ,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
            if(data.data)
            {
              resolve({ ok : true}) 
            }else
            {
               if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
            }
          
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function upsertDireccionCliente(idClienteShopify, address1, address2, city, phone, firstName, lastName, idAddress, isDefault, zoom,latitud, longitud){    
  
  var paramObject = {
    customerId: idClienteShopify,
    id: idAddress,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    city: city,
    address: address1,
    reference: address2,
    zoom: zoom,
    latitud: latitud,
    longitud: longitud,
    default: isDefault
  };
  var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/customer/address/store`,
          type:'post',
         async: false,
          headers: cHeaders(),
          data: sData ,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
          if(data.data)
            {
              resolve({ ok : true}) 
            }else
            {
               if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
            }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}

function associateFarmaclub(nombres, apellidos, email, celular, fechaNacimiento, cedula, idClienteShopify, userEmail) {    
   var paramObject = {
      nombres : nombres,
      apellidos : apellidos,
      email : email,
      userEmail : userEmail,
      celular: celular,
      fechaNacimiento:fechaNacimiento,
      cedula : cedula,
      idClienteShopify : idClienteShopify
   };
  
   var sData = JSON.stringify(paramObject);
  
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v1.0/account/vinculate`,
          type:'post',
          async: false,
          headers: uHeaders(),
          data: sData ,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
          
            if(data.data)
            {
              resolve(data.data) 
            }else
            {
               if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
            }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}
function getCobertura(latitud, longitud, ciudad){   
 
  var paramObject = {latitud:latitud, longitud : longitud,ciudad:ciudad } ;
  
   var sData = JSON.stringify(paramObject);
 
   return new Promise(function(resolve, reject) {
     $.ajax({
          url: `https://apicloud.farmacorp.com/apishopify/api/v2.0/order/validate/cobertura`,
          type:'post',
         async: false,
          headers: cHeaders(),
         data:  sData,
          contentType: 'application/json; charset=utf-8',
          success: function(data) {
           if(data)
                {
                    resolve(data) 
                }else
                {
                  if((data.errors) && (data.errors.length>0))
                    alert(data.errors[0].message);
                }
        },
        error: function(err) {
          reject(err)
       }
    });
  });
}


