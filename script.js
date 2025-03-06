const output = document.getElementById("output");

// Create loading and error elements
const loading = document.createElement("div");
const errorDiv = document.createElement("div");
loading.id = "loading";
errorDiv.id = "error";
loading.textContent = "Loading...";
output.appendChild(loading);
output.appendChild(errorDiv);

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages() {
  // Reset UI
  loading.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";
  output.appendChild(loading);

  const imagePromises = images.map(image => downloadImage(image.url).catch(error => error));

  Promise.all(imagePromises).then(results => {
    loading.style.display = "none";

    results.forEach(result => {
      if (result instanceof HTMLImageElement) {
        output.appendChild(result);
      } else {
        errorDiv.innerHTML += `<p>${result}</p>`;
      }
    });

    if (errorDiv.innerHTML) {
      output.appendChild(errorDiv);
    }
  });
}

// Add a button for downloading
const btn = document.createElement("button");
btn.textContent = "Download Images";
btn.onclick = downloadImages;
output.appendChild(btn);
