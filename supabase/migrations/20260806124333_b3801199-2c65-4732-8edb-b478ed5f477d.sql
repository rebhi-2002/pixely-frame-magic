DELETE FROM public.role_permissions
WHERE role_id = (SELECT id FROM public.roles WHERE name = 'مدير عام' LIMIT 1);

INSERT INTO public.role_permissions (role_id, page_id, permission_key)
SELECT r.id, p.id, pk.key
FROM public.roles r
JOIN public.modules m ON m.key = ANY (ARRAY['platform','shared'])
JOIN public.pages p ON p.module_id = m.id
CROSS JOIN public.permission_keys pk
WHERE r.name = 'مدير عام'
ON CONFLICT DO NOTHING;