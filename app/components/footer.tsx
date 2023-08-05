import { IALink } from "../ia-link"

export default function Footer() {
    return (
      <footer className="text-center text-sm mt-3 p-5 page-section leading-8 color-slate-600 !important">
          <div>©{new Date().getFullYear()} Virtual Cove, Inc. d/b/a Immersion Analytics. All Rights Reserved. Patented.</div>
          <div className="border-b border-slate-600 w-1/2 mx-auto"></div>
          <div className="opacity-80 my-2">All trademarks, service marks, trade names, trade dress, product names and logos appearing on the site are the property of their respective owners.</div>
          <div>
            <IALink path="/iaiap-agreement/">Immersion Analytics Insider Access Program Agreement</IALink>
          </div>
          <div>
            <IALink path="/terms-of-use/">Website Terms of Use</IALink> | <IALink path="/privacy/">Privacy Policy</IALink>
          </div>
      </footer>
    )
}
