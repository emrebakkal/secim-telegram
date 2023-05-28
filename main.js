import axios from "axios";
import { Bot } from "grammy";
import * as dotenv from "dotenv";
dotenv.config()

const bot = new Bot(process.env.BOT_API_KEY);

const electionBot = async () => {
    const url = "https://secim.aa.com.tr/data/new-result-web-short.json";
    const res = await axios
        .get(url)
    const data = res.data.CB.YurtIciDisi;

    // secim verileri
    let secim = data.s;
    let toplamSandik = secim.n.toLocaleString("tr-TR");
    let toplamSecmen = secim.e.toLocaleString("tr-TR");
    let oyVerenSecmen = secim.v.toLocaleString("tr-TR");
    let acilanSandik = secim.d.toLocaleString("tr-TR");
    let kullanilanOy = secim.o.toLocaleString("tr-TR");
    let gecerliOy = secim.g.toLocaleString("tr-TR");
    // secim verileri

    // aday verileri
    let adaylar = data.c;
    let kkToplam = adaylar[0].t.toLocaleString("tr-TR");
    let kkYuzde = adaylar[0].r;
    let rteToplam = adaylar[1].t.toLocaleString("tr-TR");
    let rteYuzde = adaylar[1].r;
    // aday verileri

    setInterval(() => {
        bot.api.sendMessage(
            "-1001804421663",
            `*Türkiye geneli (Yurt dışı dahil)*;\n\n*Toplam Sandık*: ${toplamSandik}\n*Açılan Sandık*: ${acilanSandik}\n*Toplam Seçmen*: ${toplamSecmen}\n*Oy Veren Seçmen*: ${oyVerenSecmen}\n*Kullanılan Oy*: ${kullanilanOy}\n*Geçerli Oy*: ${gecerliOy}\n\n*Kemal Kılıçdaroğlu* (Toplam): ${kkToplam}\n*Kemal Kılıçdaroğlu* (Yüzde): %${kkYuzde}\n\n*R. Tayyip Erdoğan* (Toplam): ${rteToplam}\n*R. Tayyip Erdoğan* (Yüzde): %${rteYuzde}\n\n${new Date().toLocaleDateString(
                "tr-TR"
            )} (@secimsonuclari2023tr) - *Anadolu Ajansı Verileri*`,
            { parse_mode: "Markdown" }
        ).then(() => {
            console.log("Mesaj gönderildi.");
        });
    }, 600000);

    bot.start();
};

electionBot();
