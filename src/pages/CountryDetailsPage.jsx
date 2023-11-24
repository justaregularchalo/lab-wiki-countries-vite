import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function CountryDetails() {
  const params = useParams();
  console.log(params);
  const [countryDetails, setCountryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCountry();
  }, [params.countryId]);

  const getCountry = async () => {
    try {
      const response = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${params.countryId}`
      );

      setCountryDetails(response.data); // el dato que devueve la api esta aqui en la propiedad"data"
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h3>...lodeando</h3>;
  }

  return (
    <div>
      <h1>Country Details</h1>

      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}
        alt=""
      />

      <h2>{countryDetails.name.official}</h2>

      <table>
        <tbody>
          <tr>
            <td>Capital</td>
            <td>{countryDetails.capital}</td>
          </tr>

          <tr>
            <td>Area</td>
            <td>
              {countryDetails.area} kms<sup>2</sup>
            </td>
          </tr>

          {countryDetails.borders.length > 0 ? (
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {countryDetails.borders.map((border) => (
                    <li>
                      <Link to={`/country/${border}`}>{border}</Link>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <button>
        <Link to={"/"}>Go back home</Link>
      </button>
    </div>
  );
}

export default CountryDetails;
