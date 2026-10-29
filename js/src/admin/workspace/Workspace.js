import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Dashboard from './Dashboard';
import Audit from './Audit';
import Links from './Links';
import IndexNow from './IndexNow';
import Rules from './Rules';
import Diagnostics from './Diagnostics';
import Guide from './Guide';
import { t } from '../util';

const SECTIONS = ['dashboard', 'audit', 'links', 'indexnow', 'rules', 'diagnostics', 'guide', 'settings'];
const VIEWS = { dashboard: Dashboard, audit: Audit, links: Links, indexnow: IndexNow, rules: Rules, diagnostics: Diagnostics, guide: Guide };

/** The Surveyor workspace: one section at a time, picked from the bar at the top. */
export default class Workspace extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.section = 'dashboard';
  }

  view() {
    const View = VIEWS[this.section];
    const go = (section) => {
      this.section = section;
    };

    return (
      <div className="Surveyor">
        <nav key="tabs" className="SurveyorTabs" role="tablist">
          {SECTIONS.map((section) => (
            <Button
              className={`Button ${this.section === section ? 'Button--primary' : ''}`}
              role="tab"
              aria-selected={this.section === section ? 'true' : 'false'}
              onclick={() => go(section)}
            >
              {t(`sections.${section}`)}
            </Button>
          ))}
        </nav>
        {/* Keyed, so each section starts fresh when it is opened again. */}
        {this.section === 'settings' ? <div key="settings">{this.attrs.page.content()}</div> : <View key={this.section} go={go} />}
      </div>
    );
  }
}
