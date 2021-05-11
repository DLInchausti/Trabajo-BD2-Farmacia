using System;
using System.Collections.Generic;
using System.Text;

namespace Farmacia
{
    class Cliente : Persona
    {
        


        public Cliente(string apellido, string nombre, int dni, Domicilio domicilio, ObraSocial obrasocial) : base(apellido, nombre, dni, domicilio, obrasocial)
        {
            this.apellido = apellido;
            this.nombre = nombre;
            this.dni = dni;
            this.domicilio = domicilio;
            this.obrasocial = obrasocial;
        }

        public Cliente()
        {
        }

    }


















}
