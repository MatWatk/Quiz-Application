# Quiz Application

Aplikacja quizowa stworzona w **React + TypeScript** z użyciem **Vite**. Użytkownik wybiera poziom trudności, a następnie odpowiada na serię pytań jednokrotnego wyboru w ograniczonym czasie. Po zakończeniu quizu wyświetlany jest wynik oraz „gwiazdki” zależne od liczby poprawnych odpowiedzi.

## Funkcje

- Wybór poziomu trudności: **Easy / Medium / Hard**
- Losowa kolejność pytań po wybraniu poziomu
- Pytania jednokrotnego wyboru (4 odpowiedzi)
- **Limit czasu na pytanie** z paskiem postępu
- Podświetlanie odpowiedzi:
  - poprawna → zielona
  - błędna → czerwona
- Automatyczne przejście do następnego pytania po odpowiedzi (po krótkiej chwili) lub po upływie czasu
- Ekran końcowy z wynikiem i oceną w formie gwiazdek
- Stan gry zarządzany przez **React Context** (`QuizContext`)

## Technologie

- React (React DOM)
- TypeScript
- Vite
- ESLint
- (Stylowanie: klasy utility – w projekcie jest konfiguracja `tailwind.config.js`)

## Struktura projektu (skrót)

- `src/context/QuizContext.tsx` – globalny stan gry (start, poziom, numer pytania, poprawne odpowiedzi, koniec gry itp.)
- `src/data/questions.json` – baza pytań podzielona na poziomy
- `src/pages/`
  - `StartPage.tsx` – ekran startowy
  - `CountingPage.tsx` – odliczanie przed startem
  - `QuestionPage.tsx` – ekran pytań i logika quizu
- `src/components/`
  - `LevelSelection.tsx` ��� wybór poziomu
  - `StartModal.tsx` – modal startowy po wyborze poziomu
  - `FinishModal.tsx` – modal końcowy z wynikiem
  - `TimeProgressBar.tsx` – pasek czasu na odpowiedź
  - `Score.tsx`, `Footer.tsx`, `Modal.tsx` – elementy UI

## Wymagania

- Node.js (zalecane aktualne LTS)
- npm (lub inny manager pakietów, jeśli dostosujesz komendy)

## Instalacja i uruchomienie

Przejdź do katalogu aplikacji (projekt jest w folderze `Quiz_application`):

```bash
cd Quiz_application
npm install
npm run dev
```

Aplikacja uruchomi się domyślnie pod adresem wyświetlonym w terminalu (zwykle `http://localhost:5173`).

## Build produkcyjny

```bash
cd Quiz_application
npm run build
npm run preview
```

## Dane pytań

Pytania znajdują się w pliku:

- `src/data/questions.json`

Format (przykład):

```json
{
  "Easy": [
    {
      "question": "Example question?",
      "answers": ["A", "B", "C", "D"],
      "correct": "B"
    }
  ]
}
```

## Zasady punktacji / gwiazdki

Aplikacja liczy liczbę poprawnych odpowiedzi (`correctAnswers`). Na tej podstawie przyznawane są gwiazdki:

- **3 gwiazdki**: ≥ 9 poprawnych
- **2 gwiazdki**: ≥ 6 poprawnych
- **1 gwiazdka**: ≥ 3 poprawnych
- **0 gwiazdek**: poniżej 3

(Logika w `QuizContext.tsx`.)

## Licencja

Brak zdefiniowanej licencji w repozytorium — jeśli chcesz, mogę przygotować propozycję (np. MIT) i sekcję „License”.
