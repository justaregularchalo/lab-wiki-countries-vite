import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countryList, setCountryList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        setCountryList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (isLoading) {
    return <h3>...lodeando</h3>;
  }

  return (
    <div>
      <h1>Wiki Countries: Your Guide to the World</h1>

      <ul className="list-group">
        {countryList.map((country) => {
          return (
            <li className="list-group-item" key={country._id}>
              <Link className="d-flex" to={`/country/${country.alpha3Code}`}>
                <img
                  src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                  alt=""
                  style={{ width: "50px" }}
                />
                {country.name.official}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
