const express = require("express");
const app = express();
const { Biodata } = require("./models/biodata"); // Import model Biodata
const sequelize = require("./config/database"); // Import and initialize Sequelize

app.use(express.json());

// Endpoint Create Biodata
app.post("/biodata", async (req, res) => {
  try {
    const { nama, tempatLahir, tanggalLahir, alamat } = req.body;

    // Membuat biodata baru
    const biodata = await Biodata.create({
      nama,
      tempatLahir,
      tanggalLahir,
      alamat,
    });

    res.status(201).json({
      message: "Biodata berhasil ditambahkan",
      data: biodata,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam menambahkan biodata",
      error: error.message,
    });
  }
});

// Endpoint Read All Biodata
app.get("/biodata", async (req, res) => {
  try {
    // Mengambil semua data biodata
    const biodata = await Biodata.findAll();

    res.status(200).json({
      message: "Data Biodata",
      data: biodata,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mendapatkan biodata",
      error: error.message,
    });
  }
});

// Endpoint Read Biodata by ID
app.get("/biodata/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Mencari biodata berdasarkan ID
    const biodata = await Biodata.findByPk(id);

    if (!biodata) {
      res.status(404).json({
        message: "Biodata tidak ditemukan",
      });
    } else {
      res.status(200).json({
        message: "Data Biodata",
        data: biodata,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mendapatkan biodata",
      error: error.message,
    });
  }
});

// Endpoint Update Biodata
app.put("/biodata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nama, tempatLahir, tanggalLahir, alamat } = req.body;

    // Mencari biodata berdasarkan ID
    const biodata = await Biodata.findByPk(id);

    if (!biodata) {
      res.status(404).json({
        message: "Biodata tidak ditemukan",
      });
    } else {
      // Update data biodata
      biodata.nama = nama;
      biodata.tempatLahir = tempatLahir;
      biodata.tanggalLahir = tanggalLahir;
      biodata.alamat = alamat;
      await biodata.save();

      res.status(200).json({
        message: "Biodata berhasil diupdate",
        data: biodata,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam mengupdate biodata",
      error: error.message,
    });
  }
});

// Endpoint Delete Biodata
app.delete("/biodata/:id", async (req, res) => {
  try {
    const id = req.params.id;

    //Mencari biodata berdasarkan ID
    const biodata = await Biodata.findByPk(id);

    if (!biodata) {
      res.status(404).json({
        message: "Biodata tidak ditemukan",
      });
    } else {
      // Menghapus biodata
      await biodata.destroy();

      res.status(200).json({
        message: "Biodata berhasil dihapus",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan dalam menghapus biodata",
      error: error.message,
    });
  }
});
// Menghubungkan Sequelize ke database
sequelize
  .authenticate()
  .then(() => {
    console.log('Berhasil terhubung ke database');
  })
  .catch((error) => {
    console.error('Gagal terhubung ke database:', error);
  });


// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log("Server berjalan pada port 3000");
});
