using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Farmacia
{
    class DetalleVenta
    {
      
        public int cantidad { get; set; }

        public Producto producto { get; set; }

        public int precioProducto { get; set; }

        
        public DetalleVenta(Producto p , int cantidad )
        {
            this.producto = p;
            this.cantidad = cantidad;
            this.precioProducto = p.precio_unitario * cantidad;


        }


        public DetalleVenta()
        {
           

        }

    }


}
