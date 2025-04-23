//open the dialog
document.getElementById("addImageBtn").onclick = function () {
  document.getElementById("uploadDialog").style.display = "block";
};
// close the dialog
document.getElementById("closeDialog").onclick = function () {
  document.getElementById("uploadDialog").style.display = "none";
};

// image preview in dialog
function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  } else {
    preview.classList.add("hidden");
  }
}

// show the image on the sidebar
document.querySelectorAll(".uploaded-image").forEach((img) => {
  img.addEventListener("click", function () {
    const sidebarImage = document.getElementById("sidebarImage");
    const sidebarImageName = document.getElementById("sidebarImageName");
    const sidebar = document.getElementById("sidebar");

    sidebarImage.src = this.src;
    sidebarImageName.textContent = this.alt;

    sidebar.classList.add("show");
  });
});
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  if (
    !sidebar.contains(event.target) &&
    !event.target.matches(".uploaded-image")
  ) {
    sidebar.classList.remove("show"); // Hide sidebar
  }
});
