namespace Farmacia
{
    public class Domicilio
    {
        public string calle { get; set; }
        public int numeroCalle { get; set; }
        public string localidad { get; set; }
        public string provincia { get; set; }

        public Domicilio(string calle, int numeroCalle, string localidad, string provincia)
        {
            this.calle = calle;
            this.numeroCalle = numeroCalle;
            this.localidad = localidad;
            this.provincia = provincia;
        }

        public Domicilio()
        {
           
        }





    }
}
