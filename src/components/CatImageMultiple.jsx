import { useState, useEffect } from "react";

const API_URL = "https://cataas.com/api/cats";
const IMAGE_URL = "https://cataas.com/cat";

const CatImages = () => {
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  const fetchCatImages = async (limitParam) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?limit=${limitParam}&skip=0`, {
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const imageUrls = await Promise.all(
        data.map((cat, index) =>
          index < limitParam - 10
            ? imagesData[index]
            : fetchCatImageUrl(cat._id)
        )
      );
      setImagesData(imageUrls);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatImageUrl = async (id) => {
    try {
      const response = await fetch(`${IMAGE_URL}/${id}`, {
        headers: {
          accept: "image/*",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchCatImages(limit);
  }, [limit]);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="images-container">
        {imagesData.map((url) => (
          <img key={url} src={url} alt="A random cat" />
        ))}
      </div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default CatImages;
