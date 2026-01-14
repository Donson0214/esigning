import type { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/pages/auth/LoginPage.vue';
import RegisterPage from '@/pages/auth/RegisterPage.vue';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
<<<<<<< HEAD
=======
import SignDocumentPage from '@/pages/sign/SignDocumentPage.vue';
>>>>>>> e054afa1 (Save 1)
import AppLayout from '@/layouts/AppLayout.vue';
import DashboardPage from '@/pages/dashboard/DashboardPage.vue';
import DocumentsPage from '@/pages/documents/DocumentsPage.vue';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage.vue';
import SentPage from '@/pages/sent/SentPage.vue';
import ReceivedPage from '@/pages/received/ReceivedPage.vue';
import AuditTrailPage from '@/pages/audit-trail/AuditTrailPage.vue';
<<<<<<< HEAD
=======
import NotificationsPage from '@/pages/notifications/NotificationsPage.vue';
import SignBuilderPage from '@/pages/sign/SignBuilderPage.vue';
>>>>>>> e054afa1 (Save 1)
import SettingsPage from '@/pages/settings/SettingsPage.vue';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
<<<<<<< HEAD
=======
  { path: '/sign/:token', name: 'sign-document', component: SignDocumentPage },
>>>>>>> e054afa1 (Save 1)
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordPage },
  {
    path: '/app',
    component: AppLayout,
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardPage, meta: { title: 'Dashboard' } },
<<<<<<< HEAD
=======
      { path: 'sign', name: 'sign-builder', component: SignBuilderPage, meta: { title: 'Sign' } },
>>>>>>> e054afa1 (Save 1)
      { path: 'documents', name: 'documents', component: DocumentsPage, meta: { title: 'Documents' } },
      { path: 'analytics', name: 'analytics', component: AnalyticsPage, meta: { title: 'Analytics' } },
      { path: 'sent', name: 'sent', component: SentPage, meta: { title: 'Sent' } },
      { path: 'received', name: 'received', component: ReceivedPage, meta: { title: 'Received' } },
      { path: 'audit-trail', name: 'audit-trail', component: AuditTrailPage, meta: { title: 'Audit Trail' } },
<<<<<<< HEAD
=======
      { path: 'notifications', name: 'notifications', component: NotificationsPage, meta: { title: 'Notifications' } },
>>>>>>> e054afa1 (Save 1)
      { path: 'settings', name: 'settings', component: SettingsPage, meta: { title: 'Settings' } },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
];
