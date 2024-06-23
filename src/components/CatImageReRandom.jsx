import { useState, useEffect } from "react";

const CatImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://cataas.com/cat?position=center", {
        headers: {
          accept: "image/*",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, []);

  const handleReRandom = () => {
    fetchCatImage();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <img src={imageUrl} alt="A random cat" />
      <button onClick={handleReRandom}>Re-Random</button>
    </div>
  );
};

export default CatImage;
