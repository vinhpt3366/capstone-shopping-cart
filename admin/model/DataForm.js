export const getDataForm = () => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const screen = document.getElementById("screen").value;
  const backCamera = document.getElementById("backCam").value;
  const frontCamera = document.getElementById("frontCam").value;
  const img = document.getElementById("img").value;
  const desc = document.getElementById("desc").value;
  const type = document.getElementById("type").value;
  return {
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  };
};

export const resetForm = () => {
  document.getElementById("formPhone").reset();
};

export const showDataForm = (data) => {
  const { name, price, screen, backCamera, frontCamera, img, desc, type } = data;
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("screen").value = screen;
  document.getElementById("backCam").value = backCamera;
  document.getElementById("frontCam").value = frontCamera;
  document.getElementById("img").value = img;
  document.getElementById("desc").value = desc;
  document.getElementById("type").value = type;
};

export const validateForm = () => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const screen = document.getElementById("screen").value;
  const backCamera = document.getElementById("backCam").value;
  const frontCamera = document.getElementById("frontCam").value;
  const img = document.getElementById("img").value;
  const desc = document.getElementById("desc").value;
  const type = document.getElementById("type").value;

  const tbname = document.getElementById("tbname");
  const tbprice = document.getElementById("tbprice");
  const tbscreen = document.getElementById("tbscreen");
  const tbbackCam = document.getElementById("tbbackCam");
  const tbfrontCam = document.getElementById("tbfrontCam");
  const tbimg = document.getElementById("tbimg");
  const tbdesc = document.getElementById("tbdesc");
  const tbtype = document.getElementById("tbtype");
  tbname.textContent = "";
  tbprice.textContent = "";
  tbscreen.textContent = "";
  tbbackCam.textContent = "";
  tbfrontCam.textContent = "";
  tbimg.textContent = "";
  tbdesc.textContent = "";
  tbtype.textContent = "";

  var hasError = false;
  if (!name) {
    tbname.textContent = "Name is required";
    hasError = true;
  }
  if (!price) {
    tbprice.textContent = "Price is required";
    hasError = true;
  } else if (!(Number(price) > 0)) {
    tbprice.textContent = "Price must be greater than 0";
    hasError = true;
  }
  if (!screen) {
    tbscreen.textContent = "Screen is required";
    hasError = true;
  }
  if (!backCamera) {
    tbbackCam.textContent = "Back camera is required";
    hasError = true;
  }
  if (!frontCamera) {
    tbfrontCam.textContent = "Front camera is required";
    hasError = true;
  }
  if (!img) {
    tbimg.textContent = "Image is required";
    hasError = true;
  }
  if (!desc) {
    tbdesc.textContent = "Description is required";
    hasError = true;
  }
  if (type == "Select brand") {
    tbtype.textContent = "Type is required";
    hasError = true;
  }
  if (hasError) {
    return false;
  }
  return true;
};
