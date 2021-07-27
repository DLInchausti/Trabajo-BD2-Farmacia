const { MongoClient } = require('mongodb');




async function main() {
  
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

      
      //await Punto1(client,new Date('2021-04-20T03:00:00.000+00:00'),new Date('2021-05-01T03:00:00.000+00:00'))
      //await Punto2(client,new Date('2021-04-20T03:00:00.000+00:00'),new Date('2021-05-01T03:00:00.000+00:00'))
      //await Punto3(client,new Date('2021-04-20T03:00:00.000+00:00'),new Date('2021-05-01T03:00:00.000+00:00'));
      //await Punto4(client);
      //await Punto5(client);
      //await Punto6(client);
      //await Punto7(client);
      await Punto8(client);

    }
        catch(e){
            console.log(e);
        }

     finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);
async function Punto1(client,fecha1,fecha2){
  
  const pipeline1=[
    {
      '$match': {
        'fecha': {
          '$gte': fecha1, 
          '$lte': fecha2
        }
      }
    }, {
      '$unwind': {
        'path': '$detalle'
      }
    }, {
      '$group': {
        '_id': "CantidadXCadena", 
        'VentaXCadena': {
          '$sum': '$detalle.cantidad'
        }
      }
    }
  ]
  const pipeline2=[
    {
      '$match': {
        'fecha': {
          '$gte': fecha1, 
          '$lte': fecha2
        }
      }
    }, {
      '$unwind': {
        'path': '$detalle'
      }
    }, {
      '$group': {
        '_id': '$sucursal.puntoDeVenta', 
        'VentaXSucursal': {
          '$sum': '$detalle.cantidad'
        }
      }
    }
  ]
    
  const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline1); 
        
        await aggCursor.forEach(Venta => {
        console.log(Venta._id,Venta.VentaXCadena);
      });
    
        const aggCursor2=client.db("Farmacia").collection("Venta").aggregate(pipeline2); 

        await aggCursor2.forEach(Venta => {
        console.log(Venta._id,Venta.VentaXSucursal);
        
    });
}

async function Punto2(client,fecha1,fecha2){

  const pipeline=[
      {
        '$match': {
          'fecha': {
              '$gte': fecha1, 
              '$lte': fecha2
          }
        }
      }, 
      {
        '$unwind': {
          'path': '$detalle'
          }
      },
      {
           '$group': {
              '_id': '$cliente.obrasocial.nombreObraSocial', 
              'Ventas': {
                  '$sum': 1
                  }
              }
          }
          
  ]
  const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline); 

  await aggCursor.forEach(Venta => {
      console.log(Venta._id,Venta.Ventas);
      
  });

}
  

async function Punto3(client,fecha1,fecha2){

  const pipeline1=[
    {
      '$match': {
        'fecha': {
          '$gte': fecha1, 
          '$lte': fecha2
        }
      }
    }, {
      '$unwind': {
        'path': '$detalle'
      }
    }, {
      '$group': {
        '_id': '$sucursal.puntoDeVenta', 
        'TotalVentaSucursal': {
          '$sum': {
            '$multiply': [
              '$detalle.precioProducto', '$detalle.cantidad'
            ]
          }
        }
      }
    }
  ]
    
  

  const pipeline2=[
    {
      '$match': {
        'fecha': {
          '$gte': fecha1, 
          '$lte': fecha2
        }
      }
    }, {
      '$unwind': {
        'path': '$detalle'
      }
    }, {
      '$group': {
        '_id': 'TotalVentaCadena', 
        'TotalVentaCadena': {
          '$sum': {
            '$multiply': [
              '$detalle.precioProducto', '$detalle.cantidad'
            ]
          }
        }
      }
    }
  ]
  const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline1); 
        
  await aggCursor.forEach(Venta => {
  console.log(Venta._id,Venta.TotalVentaSucursal);
});

  const aggCursor2=client.db("Farmacia").collection("Venta").aggregate(pipeline2); 

  await aggCursor2.forEach(Venta => {
  console.log(Venta._id,Venta.TotalVentaCadena);
  
});

}

async function Punto4(client,fecha1,fecha2){
  const pipeline=[
    {
      '$match': {
        'fecha': {
          '$gte': fecha1, 
          '$lte': fecha2
        }
      }
    }, {
      '$unwind': {
        'path': '$detalle'
      }
    }, {
      '$group': {
        '_id': {
          'Perfumeria': '$detalle.producto.perfumeria', 
          'Producto': '$detalle.producto.descripcion', 
          'Laboratorio': '$detalle.producto.laboratorio'
        }, 
        'TotalVentas': {
          '$sum': '$detalle.cantidad'
        }
      }
    }
  ]
  const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline); 

      await aggCursor.forEach(Venta => {
          console.log(Venta._id,"TotalVentas:",Venta.TotalVentas);
          
      });

}
async function Punto5(client){
  const pipeline=[
      {
        '$unwind': {
          'path': '$detalle'
        }
      }, {
        '$group': {
          '_id': {
            'producto': '$detalle.producto.descripcion', 
            'sucursal': '$sucursal.puntodeVenta'
          }, 
          'TotalVenta': {
            '$sum': '$detalle.precioProducto'
          }
        }
      }, {
        '$sort': {
          'TotalVenta': -1
        }
      }
    ]

    const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline); 

    await aggCursor.forEach(Venta => {
        console.log(Venta._id,"TotalVenta",Venta.TotalVenta);
        
    });

    
}

async function Punto6(client){
  
  const pipeline=[
    {
      '$unwind': {
        'path': '$detalle'
      }
    }, {
      '$group': {
        '_id': {
          'Producto': '$detalle.producto.descripcion', 
          'Sucursal': '$sucursal.puntoDeVenta'
        }, 
        'CantidadVendida': {
          '$sum': '$detalle.cantidad'
        }
      }
    }, {
      '$sort': {
        'CantidadVendida': -1
      }
    }
  ]
  const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline); 

  await aggCursor.forEach(Venta => {
      console.log(Venta._id,"CantidadVendida",Venta.CantidadVendida);

});

}
async function Punto7(client){
const pipeline=[{
  '$group': {
      '_id': {
          'sucursal': '$sucursal.puntoDeVenta',
          'cliente': '$cliente.dni'
      },
      'TotalVentas': {
          '$sum': 1
      }
  }
}, {
  '$sort': {
      '_id.sucursal': 1,
      'TotalVentas': -1
  }
}]
const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline); 

  await aggCursor.forEach(Venta => {
      console.log(Venta._id,Venta.TotalVentas);
    }
  );
   
}
async function Punto8(client){

  const pipeline=[
    {
      '$unwind': {
        'path': '$detalle'
      }
    }, {
      '$group': {
        '_id': {
          'sucursal': '$sucursal.puntoDeVenta', 
          'cliente': '$cliente.dni'
        }, 
        'compras': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'compras': -1
      }
    }
  ]
  const aggCursor=client.db("Farmacia").collection("Venta").aggregate(pipeline); 

  await aggCursor.forEach(Venta => {
      console.log(Venta._id,"Compras Realizadas",Venta.compras);
    }
  );
}


    