(() => {
  const $ = document.querySelector.bind(document);

  let timeRotate = 7000; //7 detik
  let currentRotate = 0;
  let isRotating = false;
  const wheel = $(".wheel");
  const btnWheel = $(".btn--wheel");
  const showMsg = $(".msg");

  //=====< Daftar Hadiah >=====
  const listGift = [
    {
      text: "Bucket Bunga",
      percent: 10 / 100,
    },
    {
      text: "Outfit Syar'i",
      percent: 10 / 100,
    },
    {
      text: "Hampers",
      percent: 5 / 100,
    },
    {
      text: "Jam Tangan",
      percent: 5 / 100,
    },
    {
      text: "Tas Boneka",
      percent: 5 / 100,
    },
    {
      text: "Smart Watch",
      percent: 90 / 100,
    },
    {
      text: "Aksesori",
      percent: 10 / 100,
    },
    {
      text: "Request Gift",
      percent: 20 / 100,
    },
  ];

  //=====< Jumlah hadiah >=====
  const size = listGift.length;

  //=====< Pengukuran sudut 1 hadiah menempati lingkaran >=====
  const rotate = 360 / size;

  //=====< Pengukuran sudut yang diperlukan untuk membuat kemiringan, 90 derajat dikurangi sudut 1 akun hadiah >=====
  const skewY = 90 - rotate;

  listGift.map((item, index) => {
    //=====< Buat kartu li >=====
    const elm = document.createElement("li");

    //=====< Memutar dan memiringkan kartu >=====
    elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

    //=====< Menambahkan warna latar belakang dan perataan tengah ke tag teks >=====
    if (index % 2 == 0) {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
        rotate / 2
      }deg);" class="text text-1">
			<b>${item.text}</b>
		</p>`;
    } else {
      elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
        rotate / 2
      }deg);" class="text text-2">
		<b>${item.text}</b>
		</p>`;
    }

    //=====< Tambahkan ke tag ul >=====
    wheel.appendChild(elm);
  });

  /********** Fungsi Start **********/
  const start = () => {
    var music = new Audio("audio/wheel.mp3");
    music.play();
    showMsg.innerHTML = "";
    isRotating = true;
    //=====< Ambil angka acak 0 -> 1 >=====
    const random = Math.random();

    //=====< Panggil fungsi untuk hadiah >=====
    const gift = getGift(random);

    //=====< Jumlah putaran: 360 derajat = 1 putaran (Sudut rotasi saat ini) >=====
    currentRotate += 360 * 10;

    //=====< Panggil fungsi rotasi >=====
    rotateWheel(currentRotate, gift.index);

    //=====< Memanggil fungsi cetak ke layar >=====
    showGift(gift);
  };

  /********** Roda Berputar **********/
  const rotateWheel = (currentRotate, index) => {
    $(".wheel").style.transform = `rotate(${
      //=====< Sudut saat ini dikurangi sudut hadiah>=====
      //=====< Kurangi dari setengah sudut 1 hadiah untuk membawa panah ke tengah >=====
      currentRotate - index * rotate - rotate / 2
    }deg)`;
  };

  /********** Fungsi hadiah **********/
  const getGift = (randomNumber) => {
    let currentPercent = 0;
    let list = [];

    listGift.forEach((item, index) => {
      //=====< Tambahkan persentase kemenangan hadiah satu per satu >=====
      currentPercent += item.percent;

      //=====< Angka acak kurang dari atau sama dengan persentase saat ini menambahkan hadiah ke daftar >=====
      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });

    //=====< Bonus pertama dalam daftar adalah bonus spinable >=====
    return list[0];
  };

  /********** Mencetak hadiah ke layar **********/
  const showGift = (gift) => {
    let timer = setTimeout(() => {
      var music = new Audio("audio/applause.mp3");
      music.play();
      isRotating = false;

      showMsg.innerHTML = `Kamu Mendapatkan Hadiah "${gift.text}", Kirim Ke WA Ku Ya Jawabannya | <a href="https://wa.me/6285270163310?text=Sayang aku dapat ${gift.text} nih, makasi yaa sayang hehe :*" style="text-decoration:none; color:blue;">Klik Disini!</a>`;

      clearTimeout(timer);
    }, timeRotate);
  };

  /********** Klik tombol mulai **********/
  btnWheel.addEventListener("click", () => {
    !isRotating && start();
  });
})();
