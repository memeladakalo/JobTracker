# Job Application Tracker

A responsive web application that helps job seekers organise, track, and manage their job applications in one place. Built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript, the application provides a dashboard for monitoring application progress, managing application details, and viewing statistics.

This version stores application data in the browser using **LocalStorage**, so no backend server or database installation is required.

## Features

### Dashboard
- View the total number of job applications.
- Track applications by status: Applied, Interview, Offer, and Rejected.
- View application statistics using a Chart.js doughnut chart.
- Review recent job applications in the dashboard table.

### Application management
- Add new job applications.
- View saved application details.
- Edit existing applications.
- Delete applications when they are no longer needed.
- Store the company name, job title, application date, status, job listing URL, and notes.

### Search and filtering
- Search applications by relevant details.
- Filter applications by application status.
- View matching results in the applications table.

### Data storage
- Save application records using browser LocalStorage.
- Keep saved data available when the browser is reopened on the same browser profile.
- Manage data without requiring a server-side database.

### User interface
- Responsive dashboard layout.
- Sidebar navigation.
- Application summary cards.
- Bootstrap modal for adding and editing applications.
- Responsive table for displaying application records.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structures the web pages |
| CSS3 | Styles the dashboard and interface |
| Bootstrap 5 | Provides responsive layout components and modal functionality |
| Vanilla JavaScript | Implements application logic and interactive features |
| LocalStorage | Stores application data in the browser |
| Chart.js | Displays application statistics visually |

## Project Structure

```text
job-application-tracker/
├── index.html
├── style.css
├── app.js
├── screenshots/
│   ├── dashboard.png
│   ├── add-application.png
│   └── applications-table.png
└── README.md
```

The `screenshots` folder is optional. Add it when you have captured screenshots of your working application.

## Getting Started

### Requirements

You need:
- A modern web browser, such as Microsoft Edge, Google Chrome, or Firefox.
- Visual Studio Code or another text editor.
- An internet connection to load the Bootstrap and Chart.js libraries from their CDNs.

No Node.js, XAMPP, MySQL, or administrator installation permissions are required.

### 1. Clone the repository

If Git is available on your computer, open a terminal and run:

```bash
git clone https://github.com/YOUR-USERNAME/job-application-tracker.git
```

Replace `YOUR-USERNAME` with your GitHub username.

Alternatively, download the repository as a ZIP file from GitHub and extract it.

### 2. Open the project

Open the project folder in Visual Studio Code.

Confirm that these three files are present:

- `index.html`
- `style.css`
- `app.js`

### 3. Run the application

Open `index.html` in your web browser.

For a better development experience, you can use the **Live Server** extension in Visual Studio Code if it is available to you.

1. Open `index.html`.
2. Right-click inside the editor.
3. Select **Open with Live Server**.
4. The application should open in your browser.

If Live Server is not available, opening `index.html` directly in your browser is sufficient for this version.

## How to Use the Application

1. Open the dashboard.
2. Select the option to add a job application.
3. Enter the company name, job title, application date, status, job listing URL, and any notes.
4. Save the application.
5. Review the application in the table and dashboard statistics.
6. Use search and status filters to find specific applications.
7. Edit an application when its details or status change.
8. Delete an application when it is no longer required.

## Application Data

Each job application contains the following information:

| Field | Description |
|---|---|
| Company Name | Name of the organisation |
| Job Role | Position applied for |
| Date Applied | Date the application was submitted |
| Status | Applied, Interview, Offer, or Rejected |
| Job Link | URL of the job advertisement or application |
| Notes | Additional information about the application |

## Object-Oriented Programming

The application uses a JavaScript class called `JobTracker` to organise application data and operations.

Its methods include:

- `loadJobs()` — retrieves saved application data from LocalStorage.
- `saveJobs()` — saves application data to LocalStorage.
- `createJob()` — creates a new application.
- `getJobs()` — retrieves application records.
- `updateJob()` — updates an existing application.
- `deleteJob()` — removes an application.
- `getCounts()` — calculates application statistics.

This structure helps separate data management from the user interface and makes the code easier to maintain.

## Data Storage and Limitations

This version stores data in the browser's LocalStorage.

- Application records are associated with the browser profile and website origin used to access the application.
- Data is not automatically shared between different devices or browsers.
- Clearing the browser's site data may delete saved applications.
- LocalStorage is suitable for a small personal project but is not a substitute for a secure, centralised database.

Avoid storing sensitive personal information in this version.

## Testing Checklist

Before publishing the project, test the following:

- [ ] The dashboard loads without JavaScript errors.
- [ ] A new job application can be added.
- [ ] The application appears in the table.
- [ ] Application statistics update after changes.
- [ ] Search returns matching applications.
- [ ] Status filtering works correctly.
- [ ] An existing application can be edited.
- [ ] An application can be deleted.
- [ ] Data remains available after refreshing the page.
- [ ] The dashboard displays correctly at different screen sizes.
- [ ] Invalid or incomplete form entries are handled appropriately.

Only mark a test as completed after verifying the feature in your own running application.

## Deployment

This is a static website and can be hosted using services such as:

- **GitHub Pages**
- **Netlify**

To deploy with GitHub Pages:

1. Push the project files to your GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Under the build and deployment settings, select deployment from a branch.
5. Choose the branch containing your project files and the root folder.
6. Save the settings and wait for GitHub Pages to publish the site.

Your published URL will be provided by GitHub Pages. Test the live site before sharing the link.

## Future Improvements

Possible improvements include:

- Exporting application records to CSV.
- Adding sorting and pagination.
- Adding application deadlines and reminders.
- Introducing a backend API and database.
- Adding user accounts and cloud synchronisation.
- Improving accessibility and form validation.

## Learning Outcomes

This project demonstrates practical experience with:

- Semantic HTML and responsive web design.
- CSS styling and Bootstrap components.
- JavaScript classes and object-oriented programming.
- CRUD operations: Create, Read, Update, and Delete.
- Browser-based data persistence with LocalStorage.
- DOM manipulation and event handling.
- Search, filtering, and dashboard statistics.
- Data visualisation with Chart.js.
- Testing and deploying a static web application.

## Author

**Thembela Memela**

Final-year IT student specialising in Software Development.

This project was developed as a practical portfolio project to demonstrate front-end web development and application-management skills.

## License

This project is available for educational and portfolio purposes. If you intend to distribute or reuse the code, consider adding an appropriate open-source license, such as the MIT License.
