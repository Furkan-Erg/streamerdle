# Streamerdle

Streamerdle, ünlü Türk yayıncı ve influencer'ları tahmin ettiğin bir tarayıcı oyunu. Furkan Ergüldürenler tarafından React ile geliştirildi.

## Oyun modları

| Mod | Yol | Nasıl oynanır |
| --- | --- | --- |
| **Günlük** | `/daily` | Herkes için tarihe göre aynı influencer. Günde bir oyun, 8 tahmin hakkı, seri takibi ve Wordle tarzı emoji sonuç paylaşımı. Sayfa yenilense de ilerleme korunur. |
| **Klasik** | `/classic` | Sınırsız oyun. Her tahminde cinsiyet, platform, mahlas, takipçi, doğum yılı ve kategori için renkli ipucu alırsın (yeşil = doğru, turuncu = yakın/kısmen, kırmızı = yanlış, oklar = cevap daha yüksek/düşük). 5 yanlıştan sonra bulanık fotoğraf ipucu açılır. |
| **Görsel** | `/splash` | 3×3 bulanık fotoğrafın bir parçası açık. Her yanlış tahmin ya da "Geç" bir can götürür ve yeni bir parça açar. 5 can, üst üste doğru bildikçe skor artar. |
| **Daha Çok / Daha Az** | `/higher-lower` | Sağdaki influencer'ın takipçisi soldakinden daha mı çok, daha mı az? İlk yanlışta oyun biter. |

Skorlar, rekorlar ve istatistikler tarayıcının `localStorage`'ında tutulur.

## Başlarken

```bash
npm install
npm start        # geliştirme sunucusu (cevap tarayıcı konsoluna yazılır)
npm test         # birim testleri
npm run build    # production derlemesi
```

## Proje yapısı

```
src/
  data/streamers.js     # influencer veri seti
  data/helpers.js       # etiket, sayı formatı, id ile arama
  lib/compare.js        # ipucu karşılaştırma mantığı (saf fonksiyonlar, test edildi)
  lib/random.js         # günlük seçim (seeded RNG), tekrar etmeyen rastgele seçim
  lib/storage.js        # localStorage yardımcıları ve istatistikler
  lib/hooks.js          # oyun durumu, geri sayım vb. hook'lar
  Components/           # ortak arayüz bileşenleri (ClassicBoard, StreamerSearch, ResultCard, ...)
  GameModes/            # her oyun modu için bir sayfa
  theme.js              # MUI koyu tema
tailwind.config.js      # renk tokenları (brand, surface, hint) ve animasyonlar
```

## Yeni influencer eklemek

1. Fotoğrafı `src/assets/streamer-pictures/` klasörüne koy (kare, yaklaşık 400×400 jpg ideal).
2. `src/data/streamers.js` dosyasında import et ve dosyanın başındaki şablona göre listeye ekle.
   - `id` benzersiz olmalı ve sonradan değişmemeli.
   - `followerCount` string değil **sayı** olmalı.
   - `platform` ve `category` değerleri dosyadaki `PLATFORMS` / `CATEGORIES` listelerinden seçilmeli.
3. `npm test` çalıştır: veri doğrulama testi hatalı kayıtları yakalar.

Not: Listeye kişi eklemek günlük moddaki seçimi değiştirir. Herkes aynı sürümü kullandığı için sorun olmaz, ama o gün oynanmış bir günlük oyunun cevabı değişebilir.

## Katkı

Fikir ve geliştirmelere açığız, pull request gönderebilirsin.
