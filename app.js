const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//data biodata
let biodata = [];

//endpoint Creat Biodata
app.post("/biodata", (req, res) => {
  const { nama, tempatLahir, tanggalLahir, alamat } = req.body;

  //membuat objek data baru

  const newBiodata = {
    id: biodata.length + 1,
    nama,
    tempatLahir,
    tanggalLahir,
    alamat,
  };

  //menambahkan data baru kedalam array biodata
  biodata.push(newBiodata);

  res.status(200).json({
    message: "Biodata berhasil ditambahka",
    data: newBiodata,
  });
});

//Endpoint Read Biodata
app.get("/biodata", (req, res) => {
  res.status(200).json({
    message: "Data Biodata",
    data: biodata,
  });
});

app.get("/biodata/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Mencari biodata berdasarkan id
  const biodataById = biodata.find((b) => b.id === id);

  // Mengembalikan data biodata jika ditemukan
  if (biodataById) {
    res.status(200).json({
      message: "Data Biodata",
      data: biodataById,
    });
  } else {
    res.status(404).json({
      message: "Biodata tidak ditemukan",
    });
  }
});

//Endpont Update biodata
app.put("/biodata/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, tempatLahir, tanggalLahir, alamat } = req.body;

  //mencari berdasarikan id
  const updateBiodata = biodata.find((b) => b.id === id);

  //jika id ditemukan
  if (updateBiodata) {
    updateBiodata.nama = nama;
    updateBiodata.tempatLahir = tempatLahir;
    updateBiodata.tanggalLahir = tanggalLahir;
    updateBiodata.alamat = alamat;

    res.status(200).json({
      message: "Biodata Berhasil di Update",
      data: updateBiodata,
    });
  } else {
    res.status(404).json({
      message: "Biodata tidak ditemukan",
    });
  }
});

//Endpoint delete Biodata
app.delete("/biodata/:id", (req, res) => {
  const id = parseInt(req.params.id);

  //menghapus biodata bedasarkan id
  const deleteBiodataIndex = biodata.findIndex((b) => b.id === id);

  //menghpus data jika ditemukan

  if (deleteBiodataIndex !== -1) {
    const deleteBiodata = biodata.splice(deleteBiodataIndex, 1);

    res.status(200).json({
      message: "Biodata berhasil dihapus",
      data: deleteBiodata,
    });
  } else {
    res.status(404).json({
      message: "Biodata tidak ditemukan",
    });
  }
});

app.listen(3000, () => {
  console.log("server berjalan di port 3000...");
});
