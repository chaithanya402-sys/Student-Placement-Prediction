import http.server
import socket
import socketserver
import os
import sys
import webbrowser

PORT = int(os.environ.get('PORT', sys.argv[1] if len(sys.argv) > 1 else 5000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_GET(self):
        path_only = self.path.split('?')[0].rstrip('/')
        if path_only in ('/landing', '/home'):
            self.path = '/landing.html'
        elif path_only in ('/login', '/auth'):
            self.path = '/login.html'
        elif path_only in ('/dashboard',):
            self.path = '/index.html'
        super().do_GET()

class DualStackServer(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6
    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception:
            pass
        super().server_bind()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    try:
        httpd = DualStackServer(('::', PORT), Handler)
    except Exception:
        httpd = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    
    url = f"http://localhost:{PORT}/landing.html"
    print("\n======================================================", flush=True)
    print("Student Placement Prediction System Live", flush=True)
    print("======================================================", flush=True)
    print(f"Default Startup (Landing Page): {url}", flush=True)
    print(f"Application Dashboard:          http://localhost:{PORT}/", flush=True)
    print(f"Student Overview:               http://localhost:{PORT}/#/student/overview", flush=True)
    print(f"Student Profile:                http://localhost:{PORT}/#/student/profile", flush=True)
    print(f"Faculty Mentoring Dashboard:    http://localhost:{PORT}/#/faculty/overview", flush=True)
    print(f"T&P Officer Portal:             http://localhost:{PORT}/#/officer/overview", flush=True)
    print(f"Authentication Portal:          http://localhost:{PORT}/login.html", flush=True)
    print("======================================================\n", flush=True)

    if not os.environ.get('NO_AUTO_OPEN') and not os.environ.get('CI'):
        try:
            webbrowser.open(url)
        except Exception:
            pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()
