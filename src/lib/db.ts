import { v4 as uuidv4 } from 'uuid';

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected';

export interface Application {
  id: string;
  parent_full_name: string;
  student_full_name: string;
  student_type: 'New' | 'Old';
  phone: string;
  email: string;
  status: ApplicationStatus;
  created_at: string;
}

export interface Student {
  id: string;
  surname: string;
  other_names: string;
  date_of_birth: string;
  gender: string;
  class: string;
  admission_number: string;
  created_at: string;
}

export interface Staff {
  id: string;
  surname: string;
  first_name: string;
  last_name: string;
  gender: string;
  email_address: string;
  home_address: string;
  qualification: string;
  state: string;
  created_at: string;
}

export interface NewsBlog {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url?: string;
  created_at: string;
}

export interface ExamRecord {
  id: string;
  student_id: string;
  term: string;
  academic_year: string;
  assignment: number;
  first_ca: number;
  second_ca: number;
  mid_term: number;
  exam: number;
  created_at: string;
}

class MockDB {
  private get<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private set(key: string, data: any[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Applications
  async getApplications(): Promise<Application[]> {
    return this.get<Application>('applications');
  }

  async addApplication(data: Omit<Application, 'id' | 'status' | 'created_at'>): Promise<Application> {
    const apps = await this.getApplications();
    const newApp: Application = {
      ...data,
      id: uuidv4(),
      status: 'Pending',
      created_at: new Date().toISOString(),
    };
    this.set('applications', [...apps, newApp]);
    return newApp;
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<void> {
    const apps = await this.getApplications();
    const index = apps.findIndex(a => a.id === id);
    if (index !== -1) {
      apps[index].status = status;
      this.set('applications', apps);
    }
  }

  // Students
  async getStudents(): Promise<Student[]> {
    return this.get<Student>('students');
  }

  async addStudent(data: Omit<Student, 'id' | 'created_at'>): Promise<Student> {
    const students = await this.getStudents();
    const newStudent: Student = {
      ...data,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    this.set('students', [...students, newStudent]);
    return newStudent;
  }

  // Staff
  async getStaff(): Promise<Staff[]> {
    return this.get<Staff>('staff');
  }

  async addStaff(data: Omit<Staff, 'id' | 'created_at'>): Promise<Staff> {
    const staff = await this.getStaff();
    const newStaff: Staff = {
      ...data,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    this.set('staff', [...staff, newStaff]);
    return newStaff;
  }

  // News & Blog
  async getNews(): Promise<NewsBlog[]> {
    return this.get<NewsBlog>('news_blog');
  }

  async addNews(data: Omit<NewsBlog, 'id' | 'created_at'>): Promise<NewsBlog> {
    const news = await this.getNews();
    const newEntry: NewsBlog = {
      ...data,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    this.set('news_blog', [...news, newEntry]);
    return newEntry;
  }

  async deleteNews(id: string): Promise<void> {
    const news = await this.getNews();
    this.set('news_blog', news.filter(n => n.id !== id));
  }

  // Exams & Records
  async getExamRecords(): Promise<ExamRecord[]> {
    return this.get<ExamRecord>('exams_records');
  }
}

export const db = new MockDB();

// Mock Initial Data seeding for demonstration
if (localStorage.getItem('applications') === null) {
  db.addApplication({
    parent_full_name: 'John Doe',
    student_full_name: 'Jane Doe',
    student_type: 'New',
    phone: '08012345678',
    email: 'johndoe@example.com'
  });
}
