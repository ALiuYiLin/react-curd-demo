import api from './config'

export interface Lead {
  id: number
  name: string
  phone?: string
  email?: string
  company?: string
  source?: string
  status?: string
  priority?: string
  assigned_to?: string
  remark?: string
  followed_at?: string
  created_at?: string
  updated_at?: string
}

export interface GetLeadsParams {
  name?: string
  phone?: string
  company?: string
  source?: string
  status?: string
  priority?: string
  assigned_to?: string
  limit?: number
  offset?: number
}

export type CreateLeadRequest = Omit<Lead, 'id' | 'created_at' | 'updated_at'>
export type UpdateLeadRequest = Partial<CreateLeadRequest>

export class LeadApi {
  static async getLeads(params?: GetLeadsParams): Promise<Lead[]> {
    const response = await api.get('/leads', { params })
    return response.data.data || response.data
  }

  static async getLeadById(id: number): Promise<Lead> {
    const response = await api.get(`/leads/${id}`)
    return response.data.data || response.data
  }

  static async createLead(data: CreateLeadRequest): Promise<Lead> {
    const response = await api.post('/leads', data)
    return response.data.data || response.data
  }

  static async updateLead(id: number, data: UpdateLeadRequest): Promise<Lead> {
    const response = await api.put(`/leads/${id}`, data)
    return response.data.data || response.data
  }

  static async deleteLead(id: number): Promise<void> {
    await api.delete(`/leads/${id}`)
  }

  static async searchLeadsByName(name: string): Promise<Lead[]> {
    return this.getLeads({ name })
  }
}
