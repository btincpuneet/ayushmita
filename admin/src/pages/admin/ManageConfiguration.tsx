import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputField, TextareaField } from "../../components/FormField";
import RichTextEditor from "@/components/RichTextEditor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Mail,
  Phone,
  Search,
  FileCode,
  RefreshCw,
  Trash2,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { API_BASE } from "../../config/api";
import { authHeader } from "@/utils/auth";

const API_URL = `${API_BASE}/api/global-settings`;

const configSchema = z.object({
  emailHost: z.string().min(1, "Email host is required"),
  emailPort: z.coerce.number().min(1).max(65535),
  emailUser: z.string().email("Invalid email"),
  emailPass: z.string().min(1, "Password is required"),
  adminEmail: z.string().email("Invalid admin email"),
  whatsappNumber: z
    .string()
    .regex(/^\d{10}$/, "WhatsApp number must be 10 digits")
    .optional()
    .or(z.literal("")),
  contactEmail: z.string().email("Invalid contact email").optional().or(z.literal("")),
  appointmentEmail: z.string().email("Invalid appointment email").optional().or(z.literal("")),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  emailTemplateHtml: z.string().optional(),
});

type ConfigForm = z.infer<typeof configSchema>;

const defaultForm: ConfigForm = {
  emailHost: "",
  emailPort: 587,
  emailUser: "",
  emailPass: "",
  adminEmail: "",
  whatsappNumber: "",
  contactEmail: "",
  appointmentEmail: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  emailTemplateHtml: "",
};

const tabs = [
  { id: "email", label: "Email", icon: Mail },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "seo", label: "SEO", icon: Search },
  { id: "template", label: "Template", icon: FileCode },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ManageConfiguration: React.FC = () => {
  const [form, setForm] = useState<ConfigForm>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<TabId>("email");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (res.data?.data) {
        setExists(true);
        setForm({
          emailHost: res.data.data.email_host ?? "",
          emailPort: res.data.data.email_port ?? 587,
          emailUser: res.data.data.email_user ?? "",
          emailPass: res.data.data.email_pass ?? "",
          adminEmail: res.data.data.admin_email ?? "",
          whatsappNumber: res.data.data.whatsapp_number ?? "",
          contactEmail: res.data.data.contact_email ?? "",
          appointmentEmail: res.data.data.appointment_email ?? "",
          seoTitle: res.data.data.seo_title ?? "",
          seoDescription: res.data.data.seo_description ?? "",
          seoKeywords: res.data.data.seo_keywords ?? "",
          emailTemplateHtml: res.data.data.email_template_html ?? "",
        });
      } else {
        setExists(false);
        setForm(defaultForm);
      }
    } catch {
      toast.error("Failed to load configuration");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrors({});
      const validated = configSchema.parse(form);
      const config = {
        headers: authHeader(),
      };
      if (exists) {
        await axios.put(API_URL, validated, config);
        toast.success("Configuration updated");
      } else {
        await axios.post(API_URL, validated, config);
        toast.success("Configuration created");
      }
      fetchSettings();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fix validation errors");
      } else {
        toast.error("Save failed");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(API_URL, {
        headers: authHeader(),
      });
      setForm(defaultForm);
      setExists(false);
      toast.success("Configuration deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleReset = () => {
    fetchSettings();
    toast.info("Reset to last saved configuration");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Global Configuration</h1>
            <p className="text-sm text-muted-foreground">
              Manage your application settings
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${exists
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {exists ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {exists ? "Configured" : "Not Configured"}
        </div>
      </div>

      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 border-b-2 transition ${activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-background border rounded-xl shadow-sm p-6 mb-6">
        {activeTab === "email" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField name="emailHost" label="Email Host" value={form.emailHost} onChange={handleChange} error={errors.emailHost} />
            <InputField name="emailPort" label="Email Port" type="number" value={form.emailPort} onChange={handleChange} error={errors.emailPort} />
            <InputField name="emailUser" label="Email User" value={form.emailUser} onChange={handleChange} error={errors.emailUser} />
            <InputField name="emailPass" label="Email Password" type="password" value={form.emailPass} onChange={handleChange} error={errors.emailPass} />
            <InputField name="adminEmail" label="Admin Email" value={form.adminEmail} onChange={handleChange} error={errors.adminEmail} />
          </div>
        )}

        {activeTab === "contact" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              name="whatsappNumber"
              label="WhatsApp Number"
              value={form.whatsappNumber}
              onChange={handleChange}
              maxLength={10}
              error={errors.whatsappNumber}
            />
            <InputField name="contactEmail" label="Contact Email" value={form.contactEmail} onChange={handleChange} error={errors.contactEmail} />
            <InputField name="appointmentEmail" label="Appointment Email" value={form.appointmentEmail} onChange={handleChange} error={errors.appointmentEmail} />
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-4">
            <InputField name="seoTitle" label="SEO Title" value={form.seoTitle} onChange={handleChange} />
            <TextareaField name="seoDescription" label="SEO Description" value={form.seoDescription} onChange={handleChange} />
            <TextareaField name="seoKeywords" label="SEO Keywords" value={form.seoKeywords} onChange={handleChange} />
          </div>
        )}

        {activeTab === "template" && (
          <RichTextEditor
            label="Email Template"
            value={form.emailTemplateHtml}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, emailTemplateHtml: v }))
            }
          />
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw size={16} className="mr-2" />
          Reset
        </Button>

        {exists && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Configuration</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Save size={16} className="mr-2" />
          )}
          {exists ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default ManageConfiguration;
