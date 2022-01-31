import styles from '../../styles/Home.module.css'

export default function Abstract() {
    return (
        <p className={styles.bulktext}>
        This study undertakes a CMIP5 model selection specific to the Winter Rainfall Zone
        (WRZ) of South Africa, seeking to reduce the range of future climate projections through
        identifying a subset of models with increased realism and independence. In order to
        navigate the subjectivity in identifying relevant circulation metrics to assess models
        against, the &apos;Day Zero&apos; drought is used as a characteristic episode. Here initially the
        extensive literature produced subsequent to the drought has been drawn on to identify
        and evaluate relevant regional process metrics, before utilising the anomalous conditions
        during the drought to validate various assessment methods. The dynamics subsequently
        identified as being most influential to rainfall supply in the Winter Rainfall Zone include
        the South Atlantic subtropical jet stream responsible for steering of mid-latitude storm
        systems, the South Atlantic subtropical high, and the presence, or preferably absence,
        of precipitation blocking subsidence, and the prevalence of mid-latitude storm systems,
        critical for transport and upliftment of moisture to the region. Models were subsequently
        assessed against these metrics and scored following the technique of McSweeney et al.
        (2015). Unrealistic models were removed from the ensemble while significantly biased
        models were also excluded as their absence did not significantly reduce the range of
        future projections. The same scoring methods were then utilised to create a genealogy
        of models attaining similar results to that of Knutti, Masson & Gettelman (2013). A
        subset of 6 CMIP5 models which are more independent and historically more realistic
        than that of the full ensemble were subsequently identified. While the range of future
        temperature projections of the final ensemble are somewhat constrained in comparison
        to the full ensemble, the primary utility is argued to be the reduced number of models
        where a future researcher may consider each model&apos;s projected future climate pathway
        individually before selecting a model, or models, which best informs their use case, whilst
        being assured that this model performs suitably well in the region and that the initial
        ensemble considered adequately represents model uncertainty, while strong similarity
        between two or more models within the ensemble will not be unduly biasing results.
        </p>
    )
}