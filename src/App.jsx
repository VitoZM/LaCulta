import { Route, Routes, Link } from 'react-router-dom';

import HomePage from './components/pages/Home/HomePage';
import StepOne from './components/pages/Booking/StepOne';
import SelectionPage from './components/pages/Purchase/SelectionPage';
import PaymentPage from './components/pages/Purchase/PaymentPage';
import ResumePage from './components/pages/Purchase/ResumePage';

const NotFound = () => {
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/booking" element={<StepOne />} />
      {/* <Route path="/selection/:event" element={<SelectionPage />} />
      <Route path="/payment/:ePayment" element={<PaymentPage />} />
      <Route path="/resume/:eResume" element={<ResumePage />} /> */}
    </Routes>
  );
};

export default App;
