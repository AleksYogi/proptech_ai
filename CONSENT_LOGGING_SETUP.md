# Consent Logging Setup for 152-ФЗ Compliance

This document describes the setup and implementation of the consent logging system that ensures compliance with Russian Federal Law 152-ФЗ on personal data protection.

## Overview

The consent logging system captures and stores user consent for processing personal data, providing an audit trail that can be used to demonstrate compliance with Russian data protection requirements.

## Components

### 1. Database Schema
- **Table**: `consent_logs`
- **Fields**:
 - `id`: UUID primary key
  - `timestamp`: When consent was given
  - `ip`: User's IP address
  - `user_agent`: Browser/OS information
  - `form_type`: Type of form where consent was given
  - `email`: User's email (optional)
  - `phone`: User's phone number
  - `consents`: JSON object with specific consent details
 - `policy_version`: Version of privacy policy at time of consent
  - `created_at`: Record creation timestamp
  - `updated_at`: Record update timestamp (for consent withdrawals)
  - `withdrawal_reason`: Reason for consent withdrawal (if applicable)

### 2. API Endpoints

#### `/api/lead`
- Handles lead submissions from contact forms
- Automatically logs consent when form is submitted
- Sends notifications via Telegram and email
- Validates required consent for privacy policy

#### `/api/consent-log`
- Direct endpoint for logging consent without lead submission
- Used when consent is given without submitting other data

#### `/api/consent-withdraw`
- Allows users to withdraw their consent
- Updates existing consent records to mark them as withdrawn
- Accepts email or phone to identify the user

### 3. Local Server (`server.cjs`)

The local development server includes all the same functionality as the Vercel API routes:

- Lead submission handling with consent logging
- Telegram and email notifications with consent details
- Consent withdrawal functionality

## Environment Variables

The system requires the following environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
RESEND_API_KEY=your_resend_api_key
```

## Implementation Details

### Consent Data Structure

Consent data is stored as a JSON object in the `consents` field:

```json
{
  "privacyPolicy": true,
  "dataTransfer": false
}
```

### Data Protection

- All personal data is stored securely in Supabase
- IP addresses are stored for compliance purposes but can be anonymized if required
- Consent withdrawal permanently updates consent status to false
- Full audit trail is maintained for compliance verification

## Testing

A test script is provided to verify the Supabase connection:

```bash
node test-supabase-connection.cjs
```

## Compliance Verification

The system provides:

1. **Audit Trail**: Complete record of when and how consent was given
2. **Proof of Consent**: IP address, user agent, and timestamp
3. **Version Tracking**: Records which version of privacy policy was accepted
4. **Withdrawal Mechanism**: Ability for users to withdraw consent
5. **Data Minimization**: Only stores necessary data for compliance

## Error Handling

- If Supabase is not configured, the system logs warnings but continues to operate
- If consent logging fails, the main functionality continues but logs the error
- All errors are logged for monitoring and debugging