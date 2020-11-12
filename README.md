# Zdalnie na PWr

Aplikacja dla studentów Politechniki Wrocławskiej, która pozwala zapanować nad linkami do zdalnych zajęć. O samej aplikacji, więcej na stronie [zdalnie.napwr.pl](https://zdalnie.napwr.pl).

### Publiczny kod aplikacji (open source)

Udostępniamy kod źródłowy aplikacji z dwóch powodów:
1. Aplikacja wymaga od użytkownika podania danych logowania do poczty studenckiej oraz JSOSa, które wykorzystywane są tylko w aplikacji. Dla potwierdzenia tego faktu udostępniamy publicznie kod źródłowy.
2. Aplikacja ma znacznie większy potencjał, niż zaimplementowane do tego momentu funkcjonalności. Zapraszamy każdą osobę, która programuje do pomocy nad rozwojem aplikacji. Jest jeszcze wiele funkcjonalności możliwych do dodania.

### I ty możesz dodać coś siebie

Zainteresowane osoby współtworzeniem aplikacji zapraszamy do kontaktu przez fanapge [KN Native Flow](https://m.me/knnativeflow). Mamy wiele spisanych funkcjonalności, które można zakodować. Jesteśmy również otwarci na nowe propozycje. 

Dla zainteresowanych aplikacja bazuje głównie na takich technologiach jak: TypeScript, Electron i React.
 
### Uruchomienie wersji deweloperskiej

Klasyka projektów bazujących na JS/TS:
```bash
git clone https://github.com/knnativeflow/zdalnie-na-pwr
cd zdalnie-na-pwr
yarn
yarn dev
```

### Budowanie, publikacja i automatyczna aktualizacja

W projekcie wykorzytywany jest [electron-builder](https://www.electron.build). Pozwala zbudować lokalnie gotową aplikację oraz przygotować aplikację w wersji produkcyjnej.

**Budowanie wersji lokalnej:**

W celu przygotowania wersji pod wybrany system operacyjny wystarczy w terminalu wykonać polecenie:
```bash
yarn package-[win/mac/linux]
```
Po zakończeniu skryptu plik instalacyjny aplikacji znajdziemy w folderze `release`

**Publikacje i aktualizacje:**

Przygotowanie wersji produkcyjnej wymaga odpowiedniego skonfigurowania plików `.env` oraz `electron-builder.env`. Plik `.env` zawiera klucze dla usług Sentry (monitorowanie błędów), Universal Analytics (statystyki wykorzystania aplikacji) oraz GitHub (publikowanie releasów). Plik `electron-builder.env` zawiera klucze do podpisywania aplikacji pod macOS oraz automatycznych aktualizacji przez GitHub Release.

Repozytorium posiada przygotowane GitHub Actions do automatycznego budowania aplikacji. Niestety ze względu na bardzo długi czas podpisywania aplikacji pod macOS darmowa liczba minut na GitHub Actions nie jest wystarczająca. Z tego względu na ten moment przygotowanie kolejnych wersji aplikacji możliwe jest tylko lokalnie. 

Do opublikowania aplikacji oraz jej aktualizacji należy wykonać polecenie w terminalu:
```bash
yarn package-publish
```
Polecenie buduje aplikację i przygotowuje draft nowego release'a w tym repozytorium. W celu opublikowania wersji wystarczy w repozytorium zatwierdzić draft nowego release'a. 

### Twórcy

- [Marek Waszkowski](https://github.com/waszkowski)
- [Mateusz Mitelski](https://github.com/Mitelak)
- [Maciej Kopeć](https://github.com/dimitor115)
- [Karol Sitarz](https://github.com/karolsitarz)

### Licencja

MIT © [KN Native Flow](https://github.com/knnativeflow)
