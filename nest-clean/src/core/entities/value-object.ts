export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public equals(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    // We can't compare an object here, because object compares memory space, not properties
    return JSON.stringify(vo.props) === JSON.stringify(this.props)
  }
}
