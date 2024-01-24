import { useEffect, useState } from "react";
import { IPropertyItem } from "../interfaces";
import ListingJson from "../mocks/propertiesList.json";
import { PropertyItemCard } from "../components/propertyItem";
import { Header } from "../components/header";

const fetchPropertyList = async () => {
  const response = await fetch("http://localhost:3000/api/properties", {
    credentials: "include",
  });
  let t = await response.json();
  return t;
};

export const PropertyList = () => {
  const [properties, setProperties] = useState<IPropertyItem[]>([]);
  const getProperties = async () => {
    const results = await fetchPropertyList();
    return results;
  };

  useEffect(() => {
    //go to the server to take the json
    const fetchProps = async () => {
      const results = await getProperties();
      setProperties(results);
    };
    fetchProps();
  }, []);
  const SearchProperties = async ({ query, category }: any) => {
    const results = await getProperties();
    if (query === "" && category === null) {
      setProperties(results);
      return;
    }
    let temp = [...results].filter((item) => {
      return item.address.toLowerCase().includes(query.toLowerCase());
    });
    if (category.length) {
      temp = temp.filter((item) => category.includes(item.category));
    }
    setProperties([...temp]);
  };
  return (
    <>
      <div className="property-page">
        <div className="search-wrapper">
          <Header onSearch={SearchProperties}></Header>
        </div>
        <div className="property-list-wrapper">
          {properties.map((item, index) => {
            return <PropertyItemCard {...item} key={index}></PropertyItemCard>;
          })}
        </div>
      </div>
    </>
  );
};
