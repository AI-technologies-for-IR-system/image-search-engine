# Система пошуку породи собаки по його зображенню

This project is about creating image search engine for the discipline "Artificial intelligence technologies for information retrieval system".

## General information

GitHub Projects was chosen as project management system. Here is a link to [project board](https://github.com/orgs/AI-technologies-for-IR-system/projects/3).

All info related to this course project is located in [AI technologies for IR system](https://github.com/AI-technologies-for-IR-system) organization.

Main repository of this project: [image-search-engine](https://github.com/AI-technologies-for-IR-system/image-search-engine).

In the main repository we can see [current open issues](https://github.com/AI-technologies-for-IR-system/image-search-engine/issues) (tasks) for this project.

There are [milestones](https://github.com/AI-technologies-for-IR-system/image-search-engine/milestones) - deadlines. We can see all linked issues to them, due date and overall progress of concrete milestone.

New changes in the codebase are introduced by pull requests (PR). Here we can see [the list of all opened pull requests](https://github.com/AI-technologies-for-IR-system/image-search-engine/pulls).

Maybe in the future there will be created many repositories for this project, so here is [the full list of repositories](https://github.com/orgs/AI-technologies-for-IR-system/repositories), dedicated to this project.

## Technical task

### Official document

Technical task as Microsoft Word document is located in the following path: `docs/TZ_image-search-system.doc`. You can click [here](https://github.com/AI-technologies-for-IR-system/image-search-engine/blob/master/docs/TZ_image-search-system.doc) in order to download this file.

### Functional requirements

Here is a list of functional requirements for this project:

1. Система має визначати породу пса, що зображений на наданій користувачем фотографії, та вказувати при цьому точність класифікації.
2. Фотографія, яка надається користувачем для визначення породи собаки, може бути завантажена з пристрою користувача.
3. Користувач може зробити фотографію пса, щоби визначити його породу, якщо пристрій має відповідне апаратне забезпечення.
4. Система має сповіщати користувача про ситуації, коли на наданій фотографії не було знайдено жодної собаки або було виявлено більше одного пса.
5. Якщо система некоректно визначила породу собаки, авторизований користувач  повинен мати можливість сповістити систему про це з подальшою можливістю введення правильної породи пса для цієї фотографії.
6. Адміністратор системи може переглядати всі заявки від користувачів про неправильне визначення породи собак на фотографіях.
7. Адміністратор може переглянути кожну заявку про неправильне визначення породи пса на фотографіях та прийняти рішення або про її ігнорування, або про її підтвердження, внаслідок чого модель класифікатору визначення породи собак буде скоригована.
8. Користувач може реєструватися і авторизуватися в системі.
9. Авторизований користувач може редагувати особисті дані.
10. Авторизований користувач має можливість зберігати здійснені запити в системі та відтворювати їх.
11. Користувач може шукати фото собак певної породи за її назвою, яку було введено в текстовому форматі.
12. Користувач може шукати фото пса певної породи за допомогою голосового вводу її назви.
13. Авторизований користувач може створити заявку на додання нової породи собаки, ввівши її назву та завантаживши декілька фотографій пса цієї породи.
14. Адміністратор може переглянути кожну заявку про додання нової породи собак та прийняти рішення або про її ігнорування, або про її підтвердження, внаслідок чого модель класифікатору визначення породи пса буде скоригована.

### Non-functional requirements

Here is a list of non-functional requirements for this project:

1. Система має бути кросплатформною та коректно відкриватись в більшості популярних браузерів як мобільних, так і настільних пристроїв.
2. Процес визначення породи собаки повинен відбуватись не більше 5 секунд.
3. Завантажені користувачем файли повинні перевірятись на відповідність до типу фотографій, а при виявленні порушень система має сповіщати про помилку.
4. Завантажені користувачем фотографії, розмір яких перевищує 3 МБ, не повинні оброблятися системою, а сам користувач має бути повідомлений про відповідну помилку.

## Team

Here is our squad and roles:

| № | Surname and name | Academic group | GitHub username | Role |
| --- | --- | --- | --- | --- | 
| 1 | Кравчук Аркадій | КП-11мн | [@akrava](https://github.com/akrava) | team lead |
| 2 | Песчанський Даниїл | КП-11мн | [@danya-psch](https://github.com/danya-psch) | developer |
| 3 | Гулько Данило | КП-11мн | [@Sadragiel](https://github.com/Sadragiel) | developer |
| 4 | Труш Артем | КП-11мн | [@Hiaza](https://github.com/Hiaza) | developer |
| 5 | Манохін Андрій | КП-11мн | [@andreyTheGreatest](https://github.com/andreyTheGreatest) | developer |
| 6 | Кривенко Віталій | КП-11мн | [@Veetaha](https://github.com/Veetaha) | developer |
| 7 | Атаманюк Олексій | КП-11мн | [@FireAndBlood12](https://github.com/FireAndBlood12) | developer |

## Role of each team member

Here is a list of roles, assigned to each team member:

- _Кравчук Аркадій_, КП-11мн – **лідер команди**, розроблення компонент для динамічного перенавчання класифікатора, інтеграція та тестування складових частин системи;
- _Атаманюк Олексій_, КП-11мн – розроблення веб-інтерфейсу, створення дизайну сервісу, розгортання системи на платформі хмарних обчислень;
- _Гулько Данило_, КП-11мн – розроблення та тестування веб-інтерфейсу та його взаємодії з серверною частиною;
- _Кривенко Віталій_, КП-11мн – розроблення та тестування серверної частини системи та схеми бази даних, налаштування серверу для зберігання фотографій;
- _Манохін Андрій_, КП-11мн – тестування та коригування процесу навчання нейронних мереж класифікаторів, які виявляють пса та його породу;
- _Песчанський Даниїл_, КП-11мн – розроблення та тестування компонент для класифікатора, що визначає наявність собаки на фотографіях;
- _Труш Артем_, КП-11мн – розроблення та тестування компонент для класифікатора, що визначає породу пса на зображеннях.
