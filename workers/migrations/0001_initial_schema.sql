-- Appointments table
CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_slot TEXT,
  provider_slug TEXT,
  visit_type TEXT CHECK(visit_type IN ('new_patient', 'follow_up', 'consultation')) DEFAULT 'new_patient',
  source TEXT CHECK(source IN ('cal_embed', 'manual_form', 'webhook')) DEFAULT 'manual_form',
  status TEXT CHECK(status IN ('pending', 'confirmed', 'canceled', 'completed')) DEFAULT 'pending',
  notes TEXT
);

-- Create indexes for common queries
CREATE INDEX idx_appointments_email ON appointments(email);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX idx_appointments_preferred_slot ON appointments(preferred_slot);

-- Admin users table
CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  last_login TEXT
);

-- Audit logs table
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  ts TEXT DEFAULT (datetime('now')),
  actor TEXT,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  payload TEXT,
  ip_address TEXT,
  user_agent TEXT
);

-- Create index for audit log queries
CREATE INDEX idx_audit_logs_ts ON audit_logs(ts DESC);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Contact messages table (for general inquiries)
CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT CHECK(status IN ('new', 'read', 'responded')) DEFAULT 'new'
);

-- Create index for contact messages
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
