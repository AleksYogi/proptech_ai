-- Создание таблицы для хранения логов согласий в соответствии с 152-ФЗ
-- Таблица будет содержать все необходимые данные для доказательства согласия пользователя

CREATE TABLE IF NOT EXISTS consent_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    ip INET,
    user_agent TEXT,
    form_type TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    consents JSONB NOT NULL, -- JSON поле для хранения различных типов согласий
    policy_version TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для улучшения производительности поиска по телефону и email
CREATE INDEX IF NOT EXISTS idx_consent_logs_phone ON consent_logs (phone);
CREATE INDEX IF NOT EXISTS idx_consent_logs_email ON consent_logs (email);
CREATE INDEX IF NOT EXISTS idx_consent_logs_timestamp ON consent_logs (timestamp);

-- Комментарии к таблице для документирования
COMMENT ON TABLE consent_logs IS 'Логи согласий пользователей на обработку персональных данных в соответствии с 152-ФЗ';
COMMENT ON COLUMN consent_logs.timestamp IS 'Время предоставления согласия';
COMMENT ON COLUMN consent_logs.ip IS 'IP-адрес пользователя';
COMMENT ON COLUMN consent_logs.user_agent IS 'User Agent браузера пользователя';
COMMENT ON COLUMN consent_logs.form_type IS 'Тип формы, с которой было получено согласие';
COMMENT ON COLUMN consent_logs.email IS 'Email пользователя (если предоставлен)';
COMMENT ON COLUMN consent_logs.phone IS 'Телефон пользователя';
COMMENT ON COLUMN consent_logs.consents IS 'JSON объект с деталями согласий';
COMMENT ON COLUMN consent_logs.policy_version IS 'Версия политики, на которую было дано согласие';