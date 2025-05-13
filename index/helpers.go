package index

func (x *HitV1) GetField(name string) string {
	v, ok := x.Fields[name]
	if !ok {
		return ""
	}

	if len(v.Values) == 0 {
		return ""
	}

	return v.Values[0]
}

func (x *HitV1) GetFieldValues(name string) []string {
	v := x.Fields[name]

	if len(v.Values) == 0 {
		return nil
	}

	s := make([]string, len(v.Values))

	for i := range v.Values {
		s[i] = v.Values[i]
	}

	return s
}

// Helper functions for creating QueryV1 objects from the concrete types.

func BoolQuery(q *BoolQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_Bool{
			Bool: q,
		},
	}
}

func RangeQuery(q *RangeQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_Range{
			Range: q,
		},
	}
}

func ExistsQuery(field string) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_Exists{
			Exists: field,
		},
	}
}

func MatchAllQuery() *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_MatchAll{
			MatchAll: &MatchAllQueryV1{},
		},
	}
}

func TermQuery(q *TermQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_Term{
			Term: q,
		},
	}
}

func TermsQuery(q *TermsQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_Terms{
			Terms: q,
		},
	}
}

func MatchQuery(q *MatchQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_Match{
			Match: q,
		},
	}
}

func MatchPhraseQuery(q *MatchPhraseQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_MatchPhrase{
			MatchPhrase: q,
		},
	}
}

func QueryStringQuery(q string) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_QueryString{
			QueryString: q,
		},
	}
}

func PrefixQuery(q *PrefixQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_Prefix{
			Prefix: q,
		},
	}
}

func MultiMatchQuery(q *MultiMatchQueryV1) *QueryV1 {
	return &QueryV1{
		Conditions: &QueryV1_MultiMatch{
			MultiMatch: q,
		},
	}
}
