/** Runs before paint to avoid theme flash. Reads localStorage, falls back to system pref. */
export function ThemeScript({
  defaultTheme = "system",
}: {
  defaultTheme?: "light" | "dark" | "system";
}) {
  const code = `(function(){try{var t=localStorage.getItem('theme')||'${defaultTheme}';if(t==='system')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
