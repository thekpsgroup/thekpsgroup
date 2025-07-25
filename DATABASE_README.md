# KPS Group CRM Database Documentation

## Overview

Your CRM now has a **production-ready SQLite database backend** that replaces the previous in-memory storage. All data is now persistent and survives server restarts.

## ✨ What Changed

### Before (In-Memory Storage)
- ❌ Data lost on server restart
- ❌ No data persistence
- ❌ Limited analytics capabilities
- ❌ No relationships between entities

### After (SQLite Database)
- ✅ **Persistent data storage**
- ✅ **Relational database with proper schemas**
- ✅ **Advanced analytics and reporting**
- ✅ **Data relationships (leads → clients → deals)**
- ✅ **Security audit logging**
- ✅ **Backup capabilities**

## 🗄️ Database Schema

### Core Tables

#### `leads`
- **Purpose**: Store all incoming leads from forms
- **Key Fields**: name, email, phone, service, status, value, source
- **Statuses**: new, contacted, qualified, proposal, negotiation, won, lost

#### `clients`
- **Purpose**: Converted leads that became paying customers
- **Key Fields**: name, email, total_value, status
- **Linked to**: leads table (conversion tracking)

#### `deals`
- **Purpose**: Individual projects/contracts with clients
- **Key Fields**: title, amount, status, probability, close_date
- **Statuses**: proposal, negotiation, review, closed_won, closed_lost

#### `analytics_events`
- **Purpose**: Track all user interactions and page views
- **Key Fields**: event_type, page, action, ip_address, session_id

#### `security_logs`
- **Purpose**: Security and audit trail
- **Key Fields**: event_type, user_id, ip_address, severity

## 🚀 Getting Started

### 1. Initialize Database
```bash
npm run db:init
```
This creates the database schema and adds sample data.

### 2. Start CRM with Database
```bash
npm run crm:start
```
This initializes the database (if needed) and starts the development server.

### 3. Manual Database Operations
```bash
# Backup database
npm run db:backup

# Just initialize (without starting server)
npm run db:init
```

## 📊 What You'll See Now

### Enhanced Dashboard
- **Real KPIs**: Actual lead counts, conversion rates, revenue
- **Live Data**: All metrics update in real-time
- **Lead Sources**: Track where leads come from
- **Geographic Data**: See which cities generate most leads
- **Monthly Trends**: Historical performance data

### Lead Management
- **Persistent Storage**: All form submissions saved permanently
- **Status Tracking**: Move leads through sales pipeline
- **Value Estimation**: Automatic lead value calculation
- **Source Attribution**: Track marketing channel effectiveness

## 🔧 Database Files

### Location
- **Database File**: `database/kps_crm.db`
- **Schema**: `database/schema.sql`
- **Utilities**: `src/utils/database.ts`
- **Types**: `src/types/database.ts`

### Backup System
- Automatic backup function available
- Backups stored in `database/backup_YYYY-MM-DD.db`
- Can be restored by copying back to `kps_crm.db`

## 🛡️ Security Features

### Built-in Security
- **SQL Injection Protection**: Prepared statements
- **Input Validation**: Type-safe operations
- **Audit Logging**: All CRM access logged
- **Rate Limiting**: Protection against abuse
- **Session Management**: Secure authentication

### Security Logs
All security events are tracked:
- Login attempts
- Data access
- Failed authentications
- Suspicious activity

## 📈 Analytics Capabilities

### Real-Time Metrics
- Total leads and conversion rates
- Revenue and pipeline value
- Geographic performance
- Service popularity
- Source effectiveness

### Historical Tracking
- Monthly lead trends
- Conversion rate over time
- Revenue growth
- Customer lifetime value

## 🔄 Data Flow

### Lead Submission Process
1. **Form Submitted** → Contact form on website
2. **Lead Created** → Stored in `leads` table
3. **Analytics Tracked** → Event logged in `analytics_events`
4. **Email Sent** → Notification to sales team
5. **Dashboard Updated** → Real-time metrics refresh

### CRM Dashboard Process
1. **User Accesses CRM** → Authentication check
2. **Data Fetched** → Direct database queries
3. **Analytics Calculated** → Real-time KPI computation
4. **Display Updated** → Live dashboard with current data

## 🚨 Migration Notes

### Automatic Migration
- Your CRM automatically detects the new database system
- No manual data migration needed
- First run creates schema and sample data

### API Compatibility
- All existing API endpoints work unchanged
- Enhanced with persistent storage
- Backward compatible with existing frontend

## 🎯 Production Considerations

### Performance
- SQLite handles thousands of records efficiently
- Indexed for optimal query performance
- Connection pooling for concurrent access

### Scalability
- Can easily migrate to PostgreSQL for larger scale
- Schema designed for enterprise growth
- Export/import tools available

### Monitoring
- Database operations logged
- Performance metrics tracked
- Error handling and recovery

## 🔧 Troubleshooting

### Common Issues

#### Database Lock Error
- **Cause**: Multiple connections accessing database
- **Solution**: Restart the development server

#### Schema Not Found
- **Cause**: Database not initialized
- **Solution**: Run `npm run db:init`

#### Permission Errors
- **Cause**: File system permissions
- **Solution**: Check `database/` folder permissions

### Debug Commands
```bash
# Check database exists
ls database/

# View database schema
sqlite3 database/kps_crm.db ".schema"

# View data
sqlite3 database/kps_crm.db "SELECT * FROM leads LIMIT 5;"
```

## 📝 Next Steps

### Immediate Benefits
- ✅ **Data Persistence**: No more lost leads
- ✅ **Real Analytics**: Actual business metrics
- ✅ **Audit Trail**: Complete activity history
- ✅ **Professional CRM**: Enterprise-grade features

### Future Enhancements
- [ ] User management system
- [ ] Advanced reporting dashboard
- [ ] Email automation workflows
- [ ] Integration with accounting systems
- [ ] Mobile app support

---

**🎉 Congratulations!** Your CRM now has a professional, persistent database backend that will scale with your business growth.
