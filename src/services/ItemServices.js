import { useHttp } from "../hooks/http.hook";

const ItemServices = () => {
  const { loading, request, error, clearError } = useHttp();

  const getAllItems = async () => {
    const res = await request("http://localhost:3001/goods");
    return res.map((item) => _transformItems(item));
  };

  const _transformItems = (item) => {
    const {
      id,
      image,
      name,
      description,
      adddescription,
      price,
      newPrice,
      category,
      quantity,
      brand,
      status,
      season,
      gender,
      age,
      color,
      material,
    } = item;

    return {
      id: id,
      image: image,
      name: name,
      description: description,
      adddescription: adddescription,
      price: price,
      newPrice: newPrice,
      category: category,
      quantity: quantity,
      brand: brand,
      status: status,
      season: season,
      gender: gender,
      age: age,
      material: material,
      color: color,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllItems,
  };
};

export default ItemServices;
