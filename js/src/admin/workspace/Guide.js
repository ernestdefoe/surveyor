import Component from 'flarum/common/Component';
import { t } from '../util';

const TOPICS = ['companions', 'dashboard', 'audit', 'score', 'links', 'indexnow', 'rules', 'diagnostics', 'settings', 'privacy'];

/** Plain-words help for each section. */
export default class Guide extends Component {
  view() {
    return (
      <div className="SurveyorSection SurveyorGuide">
        {TOPICS.map((topic) => (
          <section>
            <h3>{t(`guide.${topic}_title`)}</h3>
            <p>{t(`guide.${topic}_body`)}</p>
          </section>
        ))}
      </div>
    );
  }
}
