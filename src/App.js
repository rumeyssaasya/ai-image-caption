import { useState } from "react";
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setCaption(""); // reset caption when new image is selected
    } else {
      setPreview(null);
    }
  };

  const uploadImage = async () => {
    if (!file) return;
    setLoading(true);
    setCaption("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/caption", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to get caption");
      }

      const data = await res.json();
      setCaption(data.caption);
    } catch (error) {
      console.error(error);
      setCaption("Error generating caption. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <h1>✨ AI Image Caption</h1>
          <p>Upload any image and let AI describe it for you in seconds.</p>
        </header>

        <div className="upload-section">
          <label className="upload-box" htmlFor="fileInput">
            {preview ? (
              <img src={preview} alt="Preview" className="image-preview" />
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">📸</span>
                <span>Click to select an image</span>
              </div>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </div>

        <button 
          className="generate-btn" 
          onClick={uploadImage} 
          disabled={!file || loading}
        >
          {loading ? (
            <span className="spinner"></span>
          ) : (
            "Generate Caption"
          )}
        </button>

        {caption && (
          <div className="result-section">
            <h3>Caption Result:</h3>
            <div className="caption-box">
              <p>{caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;