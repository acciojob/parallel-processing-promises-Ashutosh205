const output = document.getElementById("output");
const loading = document.createElement("div");
const errorDiv = document.createElement("div");
loading.id = "loading";
errorDiv.id = "error";
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
  loading.textContent = "Loading...";
  errorDiv.textContent = "";
  output.innerHTML = "";
  output.appendChild(loading);

  const imagePromises = images.map(image => downloadImage(image.url));

  Promise.all(imagePromises)
    .then(imgElements => {
      loading.style.display = "none";
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      loading.style.display = "none";
      errorDiv.textContent = error;
      output.appendChild(errorDiv);
    });
}

downloadImages();
