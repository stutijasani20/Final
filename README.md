<h1>Elegance Air-Flight Booking System</h1>
<h2>Overview</h2>
<p>
Elegance Air is a comprehensive flight booking system built with Django Rest Framework (DRF) for the backend and Next.js for the frontend. This system offers a seamless and efficient way for users to search for flights, manage bookings, and explore nearby attractions such as hotels, restaurants, and tourist spots. Administrators have access to an advanced dashboard for managing flights and user profiles./p>
<h2>Features</h2>
<h3>User Features</h3>
<ul>
  <li><strong>Flight Search</strong>: Users can search for available flights based on origin, destination, and date.</li>
  <li><strong>Manage Flights</strong>: Users can book, view, and manage their flight reservations.</li>
  <li><strong>Cancel Bookings</strong>: Users have the ability to cancel their flight bookings.</li>
  <li><strong>User Profile Management</strong>: Users can view and update their profile information.</li>
  <li><strong>Nearby Attractions</strong>: After logging in, users can view maps displaying hotels, restaurants, and tourist places near their arrival airport.</li>
</ul>
<h3>Admin Features</h3>
<ul>
  <li><strong>Admin Dashboard</strong>: Airport Staff have access to a dashboard for viewing flights, bookings, and user profiles.</li>
</ul>

<h2>Technologies Used</h2>
<h3>Backend</h3>
<ul>
<li><strong>Django Rest Framework (DRF)</strong>: Provides a powerful and flexible toolkit for building Web APIs.</li>
<li><strong>PostgreSQL</strong>: A robust relational database for storing flight, booking, and user data.</li>
</ul>
<h3>Frontend</h3>
<ul>
  <li><strong>Next.js</strong>: A React framework that enables server-side rendering and generates static websites for React-based web applications.</li>
  <li><strong>Tailwind CSS</strong>: A utility-first CSS framework for rapid UI development.</li>
  <li><strong>SCSS</strong>: A type CSS that lets you write cleaner,more maintainable CSS code with features like variables, nestin</li>
</ul>
<h3>Others</h3>
<ul>
  <li><strong>Map Integration</strong>: Displays maps for nearby hotels, restaurants, and tourist places. Used 3rd party API keys</li>
</ul>
<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
  <li>Node.js and npm installed</li>
  <li>Python and pip installed</li>
  <li>PostgreSQL installed and running</li>
</ul>
<h3>Backend Setup</h3>
<ol>
  <li><strong>Clone the repository</strong>:
    <pre><code>git clone git@github.com:stutijasani20/Final.git</code></pre>
  </li>
  <li><strong>Install the required packages</strong>:
            <pre><code>pip install -r requirements.txt</code></pre>
  </li>
  <li><strong>Navigate to the backend directory</strong>:
            <pre><code>cd ../backend</code></pre>
  </li>
  <li><strong>Configure the database</strong>: Update the <code>DATABASES</code> setting in <code>settings.py</code> with your PostgreSQL credentials.</li>
  <li><strong>Apply migrations</strong>:
    <pre><code>python manage.py migrate</code></pre>
  </li>
  <li><strong>Create a superuser</strong>:
    <pre><code>python manage.py createsuperuser</code></pre>
  </li>
  <li><strong>Start the development server</strong>:
    <pre><code>python manage.py runserver</code></pre>
  </li>
</ol>

  <h3>Frontend Setup</h3>
  <ol>
    <li><strong>Navigate to the frontend directory</strong>:
            <pre><code>cd ../frontend</code></pre>
    </li>
    <li><strong>Install the required packages</strong>:
            <pre><code>npm install</code></pre>
    </li>
        <li><strong>Start the development server</strong>:
            <pre><code>npm run dev</code></pre>
        </li>
    </ol>
<h3>Running the Application</h3>
    <p>The backend server will be running on <code>http://localhost:8000/</code>.</p>
    <p>The frontend server will be running on <code>http://localhost:3000/</code>.</p>

<h2>Usage</h2>
    <ol>
        <li><strong>Access the application</strong>: Open <code>http://localhost:3000/</code> in your web browser.</li>
        <li><strong>Register/Login</strong>: Create a new account or log in with existing credentials.</li>
        <li><strong>Search Flights</strong>: Use the search functionality to find available flights based on your criteria.</li>
        <li><strong>Book/Manage Flights</strong>: Book flights and manage your bookings through your profile.</li>
        <li><strong>Explore Nearby Attractions</strong>: After booking, view maps of hotels, restaurants, and tourist places near your destination.</li>
        <li><strong>Admin Dashboard</strong>: Log in as an admin to access the dashboard for managing flights and user profiles.</li>

<h2>Contact</h2>
<p>For any inquiries or support, please contact us at <a href="mailto:support@eleganceair.com">support@eleganceair.com</a>.</p>
<p>Thank you for using Elegance Air! I hope you have a great experience booking flights and exploring new destinations.</p>

      
