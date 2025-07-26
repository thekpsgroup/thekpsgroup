import { z } from 'zod';

// User validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['admin', 'manager', 'sales_rep']).default('sales_rep')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Lead validation schemas
export const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']).default('new'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  source: z.string().optional(),
  assigned_to: z.string().uuid().optional(),
  value: z.number().min(0).optional(),
  notes: z.string().optional()
});

export const updateLeadSchema = createLeadSchema.partial().extend({
  id: z.string().uuid()
});

export const updateLeadStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'])
});

// Activity validation schemas
export const createActivitySchema = z.object({
  lead_id: z.string().uuid(),
  type: z.enum(['call', 'email', 'meeting', 'note', 'task']),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().optional(),
  scheduled_at: z.string().datetime().optional()
});

export const updateActivitySchema = createActivitySchema.partial().extend({
  id: z.string().uuid()
});

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20)
});

export const leadFilterSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']).optional(),
  assigned_to: z.string().uuid().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  search: z.string().optional()
});

// Validation helper function
export function validateData(schema, data) {
  try {
    return {
      success: true,
      data: schema.parse(data)
    };
  } catch (error) {
    return {
      success: false,
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    };
  }
}

// API response helpers
export function successResponse(data, message = 'Success') {
  return {
    success: true,
    message,
    data
  };
}

export function errorResponse(message, errors = null, status = 400) {
  return {
    success: false,
    message,
    errors,
    status
  };
}
