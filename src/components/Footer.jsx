export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span>&copy; {new Date().getFullYear()} Registration App. All rights reserved.</span>
        <span>Privacy Policy &middot; Terms of Service &middot; Security</span>
      </div>
    </footer>
  )
}