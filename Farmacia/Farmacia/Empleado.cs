using System;
using System.Collections.Generic;
using System.Text;

namespace Farmacia
{
    class Empleado : Persona
    {
        public string cuil { get; set; }
        public bool encargado { get; set; }

        public  Empleado(string cuil, string apellido, string nombre, int dni, Domicilio domicilio, ObraSocial obrasocial,bool encargado) : base(apellido, nombre, dni, domicilio, obrasocial)
        {
            this.cuil = cuil;
            this.apellido = apellido;
            this.nombre = nombre;
            this.dni = dni;
            this.domicilio = domicilio;
            this.obrasocial = obrasocial;
            this.encargado = encargado;
        }

        public Empleado()
        {




        }
    }
}
