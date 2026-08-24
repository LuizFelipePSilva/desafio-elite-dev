import { Routes, Route } from 'react-router-dom';

import { RequireAuth } from './RequireAuth';
import { RequireRole } from './RequireRole';

import { ConfirmTicket } from '@/pages/ConfirmTicket';
import { Events } from '@/pages/Events';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { PlatformEvents } from '@/pages/PlatformEvents';
import { Register } from '@/pages/Register';
import { Tickets } from '@/pages/Tickets';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/events"
        element={
          <RequireAuth>
            <RequireRole roles={['ORGANIZER', 'CUSTOMER']}>
              <PlatformEvents />
            </RequireRole>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/events/create"
        element={
          <RequireAuth>
            <RequireRole roles={['ORGANIZER']}>
              <Events />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/tickets"
        element={
          <RequireAuth>
            <RequireRole roles={['CUSTOMER']}>
              <Tickets />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/confirm-ticket"
        element={
          <RequireAuth>
            <RequireRole roles={['GATEKEEPER']}>
              <ConfirmTicket />
            </RequireRole>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
